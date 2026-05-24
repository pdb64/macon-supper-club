"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, validPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function eastCoastDateTimeToUtc(value: string) {
  if (!value) return new Date();
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(formatter.formatToParts(utcGuess).map((part) => [part.type, part.value]));
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

export async function loginAction(formData: FormData) {
  const password = required(formData.get("password"));
  if (!validPassword(password)) redirect("/admin/login?error=1");
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/");
}

export async function updateMenuAction(formData: FormData) {
  const menuId = required(formData.get("menuId"));
  const status = required(formData.get("status")) as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  await prisma.menu.update({
    where: { id: menuId },
    data: {
      title: required(formData.get("title")),
      sundayDate: eastCoastDateTimeToUtc(required(formData.get("sundayDate"))),
      cutoffAt: eastCoastDateTimeToUtc(required(formData.get("cutoffAt"))),
      pickupNotes: required(formData.get("pickupNotes")),
      soldOut: formData.get("soldOut") === "on",
      status,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateMenuItemAction(formData: FormData) {
  const itemId = required(formData.get("itemId"));
  await prisma.menuItem.update({
    where: { id: itemId },
    data: {
      sortOrder: Number(formData.get("sortOrder") ?? 1),
      name: required(formData.get("name")),
      description: required(formData.get("description")),
      imageUrl: required(formData.get("imageUrl")) || null,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function addMenuItemAction(formData: FormData) {
  const menuId = required(formData.get("menuId"));
  const count = await prisma.menuItem.count({ where: { menuId } });
  await prisma.menuItem.create({
    data: {
      menuId,
      sortOrder: count + 1,
      name: "New course",
      description: "Describe the dish here.",
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteMenuItemAction(formData: FormData) {
  const itemId = required(formData.get("itemId"));
  await prisma.menuItem.delete({ where: { id: itemId } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("image");
  const label = required(formData.get("label")) || "Uploaded image";
  if (!(file instanceof File) || file.size === 0) return;

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  await prisma.siteImage.create({
    data: {
      label,
      url: `/uploads/${filename}`,
      alt: required(formData.get("alt")) || label,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}
