import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { dollarsToCents } from "@/lib/money";
import { getOrderingState, getPortion } from "@/lib/ordering";
import { getOrderingOverride } from "@/lib/site";

export async function POST(request: Request) {
  const form = await request.formData();
  const menuId = String(form.get("menuId") ?? "");
  const portionId = String(form.get("portionId") ?? "two");
  const quantity = Math.min(10, Math.max(1, Number(form.get("quantity") ?? 1)));
  const tipCents = dollarsToCents(String(form.get("tipDollars") ?? "0"));
  const customerName = String(form.get("customerName") ?? "").trim();
  const customerEmail = String(form.get("customerEmail") ?? "").trim();
  const customerPhone = String(form.get("customerPhone") ?? "").trim();
  const allergens = String(form.get("allergens") ?? "").trim();
  const notes = String(form.get("notes") ?? "").trim();

  if (!customerName || !customerEmail || !customerPhone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  const menu = await prisma.menu.findUnique({ where: { id: menuId } });
  const ordering = getOrderingState(menu);
  const orderingOverride = await getOrderingOverride();
  if (!ordering.open || orderingOverride.closed || !menu) {
    return NextResponse.json(
      { error: orderingOverride.message || ordering.reason },
      { status: 409 },
    );
  }

  const portion = getPortion(portionId);
  const subtotalCents = portion.priceCents * quantity;
  const processingFeeCents = Math.round((subtotalCents + tipCents) * 0.035);
  const totalCents = subtotalCents + tipCents + processingFeeCents;

  const order = await prisma.order.create({
    data: {
      menuId,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      allergens,
      portionId: portion.id,
      portionName: portion.name,
      quantity,
      subtotalCents,
      tipCents,
      processingFeeCents,
      totalCents,
    },
  });

  const key = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_SITE_URL in .env.",
        orderId: order.id,
      },
      { status: 503 },
    );
  }

  const stripe = new Stripe(key);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,
    metadata: { orderId: order.id, menuId },
    line_items: [
      {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: portion.priceCents,
          product_data: {
            name: `${portion.name} · ${menu.title}`,
            description: `Pickup ${menu.pickupNotes}`,
          },
        },
      },
      ...(tipCents > 0
        ? [
            {
              quantity: 1,
              price_data: {
                currency: "usd",
                unit_amount: tipCents,
                product_data: { name: "Optional chef tip" },
              },
            },
          ]
        : []),
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: processingFeeCents,
          product_data: { name: "Card processing" },
        },
      },
    ],
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.redirect(session.url ?? `${siteUrl}/success`, 303);
}
