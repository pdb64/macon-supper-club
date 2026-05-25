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

  try {
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
  } catch {
    redirect("/catering-thank-you?setup=1");
  }

  redirect("/catering-thank-you");
}

export async function subscribeToMenuEmails(formData: FormData) {
  const email = text(formData.get("email")).toLowerCase();
  const firstName = text(formData.get("firstName"));

  if (!email) {
    redirect("/?signup=missing#signup");
  }

  try {
    await (prisma as any).emailSubscriber.upsert({
      where: { email },
      update: { firstName: firstName || null, source: "homepage" },
      create: { email, firstName: firstName || null, source: "homepage" },
    });
  } catch {
    redirect("/email-thank-you?setup=1");
  }

  redirect("/email-thank-you");
}
