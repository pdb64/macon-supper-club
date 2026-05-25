"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function optionalDate(value: string) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00-04:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function optionalInt(value: string) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function submitCateringInquiry(formData: FormData) {
  const customerName = text(formData.get("customerName"));
  const email = text(formData.get("email"));
  const phone = text(formData.get("phone"));

  if (!customerName || !email || !phone) {
    redirect("/?catering=missing#catering");
  }

  await prisma.cateringInquiry.create({
    data: {
      customerName,
      email,
      phone,
      eventDate: optionalDate(text(formData.get("eventDate"))),
      eventTime: text(formData.get("eventTime")) || null,
      guestCount: optionalInt(text(formData.get("guestCount"))),
      budget: text(formData.get("budget")) || null,
      eventType: text(formData.get("eventType")) || null,
      location: text(formData.get("location")) || null,
      notes: text(formData.get("notes")) || null,
    },
  });

  redirect("/catering-thank-you");
}

