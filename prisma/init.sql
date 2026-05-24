PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "Menu" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "sundayDate" DATETIME NOT NULL,
  "cutoffAt" DATETIME NOT NULL,
  "pickupNotes" TEXT NOT NULL DEFAULT 'Pickup Sunday, 5-6pm at Grey Goose Players Club.',
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "soldOut" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "MenuItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "menuId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  CONSTRAINT "MenuItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Order" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "menuId" TEXT NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerEmail" TEXT NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "notes" TEXT,
  "allergens" TEXT,
  "portionId" TEXT NOT NULL,
  "portionName" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "subtotalCents" INTEGER NOT NULL,
  "tipCents" INTEGER NOT NULL DEFAULT 0,
  "processingFeeCents" INTEGER NOT NULL DEFAULT 0,
  "totalCents" INTEGER NOT NULL,
  "stripeSessionId" TEXT,
  "stripePaymentIntentId" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Order_stripeSessionId_key" ON "Order" ("stripeSessionId");

CREATE TABLE IF NOT EXISTS "SiteImage" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "label" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Setting" (
  "key" TEXT NOT NULL PRIMARY KEY,
  "value" TEXT NOT NULL,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

