import type { Menu } from "@prisma/client";

export const PORTIONS = [
  { id: "one", name: "Individual Supper", description: "Plated for one", priceCents: 4000 },
  { id: "two", name: "Supper for Two", description: "Most reserved, perfect for a Sunday in", priceCents: 7500 },
  { id: "four", name: "Family Supper for Four", description: "A full table, with leftovers if you are lucky", priceCents: 14000 },
] as const;

export type PortionId = (typeof PORTIONS)[number]["id"];

export function getPortion(id: string) {
  return PORTIONS.find((portion) => portion.id === id) ?? PORTIONS[1];
}

function easternParts(date: Date) {
  return Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date).map((part) => [part.type, part.value]),
  );
}

function eastCoastDateTimeToUtc(year: number, month: number, day: number, hour: number, minute: number) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const parts = easternParts(utcGuess);
  const asEastern = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
  );
  const wanted = Date.UTC(year, month - 1, day, hour, minute);
  return new Date(utcGuess.getTime() + (wanted - asEastern));
}

export function menuExpiresAt(menu: Pick<Menu, "sundayDate">) {
  const parts = easternParts(menu.sundayDate);
  return eastCoastDateTimeToUtc(Number(parts.year), Number(parts.month), Number(parts.day), 0, 1);
}

export function isMenuCurrent(menu: Pick<Menu, "sundayDate">, now = new Date()) {
  return now < menuExpiresAt(menu);
}

export function getOrderingState(menu: Pick<Menu, "cutoffAt" | "soldOut" | "status" | "sundayDate"> | null) {
  if (!menu) return { open: false, reason: "New menu coming Tuesday morning." };
  if (menu.status !== "PUBLISHED") return { open: false, reason: "This menu is not open yet." };
  if (!isMenuCurrent(menu)) return { open: false, reason: "New menu coming Tuesday morning." };
  if (menu.soldOut) return { open: false, reason: "This week's supper is sold out." };
  if (new Date() >= menu.cutoffAt) return { open: false, reason: "Ordering has closed for this Sunday." };
  return { open: true, reason: "Reservations are open." };
}

export function displayDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  }).format(date);
}

export function displayCutoff(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/New_York",
  }).format(date);
}
