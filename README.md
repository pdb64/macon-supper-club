# Macon Supper Club

This is the maintainable full-stack version of the Claude Design export.

## What is included

- Public supper club website using the original design assets.
- Weekly menu stored in a SQLite database.
- Password-protected admin dashboard at `/admin`.
- Image upload for menu/gallery images.
- Ordering cutoff controlled by the active menu's cutoff date/time, intended for Saturday 4:00 PM ET.
- Stripe Checkout route at `/api/checkout`.
- Stripe webhook route at `/api/stripe/webhook`.
- Instagram feed hook using `INSTAGRAM_ACCESS_TOKEN`, with a graceful fallback when it is blank.

## Local setup

1. Copy `.env.example` to `.env`.
2. Change `ADMIN_PASSWORD` and `AUTH_SECRET`.
3. Run:

```bash
npm install
npm run setup
npm run dev
```

Then open `http://localhost:3000`.

## Admin

Open `http://localhost:3000/admin` and sign in with `ADMIN_PASSWORD`.

From there you can:

- Publish or draft the weekly menu.
- Set the Sunday pickup date.
- Set the Saturday cutoff time in Eastern Time.
- Mark a menu sold out.
- Add, edit, delete, and reorder courses.
- Upload images and attach them to menu items.
- Review recent reservations and payment status.

## Stripe

Add these to `.env` before taking real payments:

```bash
STRIPE_SECRET_KEY="sk_live_or_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

In Stripe, create a webhook endpoint pointing to:

```text
https://your-domain.com/api/stripe/webhook
```

Listen for:

- `checkout.session.completed`
- `checkout.session.expired`

## Instagram

Add a long-lived Instagram access token:

```bash
INSTAGRAM_ACCESS_TOKEN="..."
```

If this is blank, the site still works and shows the manually uploaded gallery instead.

## Deployment note

This first version uses local SQLite and local image uploads, which are ideal for local development and a small single-server deployment. If you deploy to Vercel or another serverless host, move the database to hosted Postgres and images to object storage such as S3, UploadThing, or Vercel Blob.

