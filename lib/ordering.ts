import type { Menu } from "@prisma/client";

export const PORTIONS = [
  { id: "one", name: "Individual Supper", description: "Plated for one", priceCents: 4000 },
  { id: "two", name: "Dinner for Two", description: "Most reserved, perfect for a Sunday in", priceCents: 7500 },
  { id: "four", name: "Family Supper for Four", description: "A full table, with leftovers if you are lucky", priceCents: 14000 },
] as const;

export type PortionId = (typeof PORTIONS)[number]["id"];

export function getPortion(id: string) {
  return PORTIONS.find((portion) => portion.id === id) ?? PORTIONS[1];
}

export function getOrderingState(menu: Pick<Menu, "cutoffAt" | "soldOut" | "status"> | null) {
  if (!menu) return { open: false, reason: "No menu is published yet." };
  if (menu.status !== "PUBLISHED") return { open: false, reason: "This menu is not open yet." };
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

