import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const menuItems = [
  {
    name: "Chicken Schnitzel",
    description:
      "Pounded thin chicken cutlet, herb-breaded and fried crisp, finished with classic mushroom chasseur sauce and fresh lemon wedges.",
  },
  {
    name: "Baked Cheddar-Swiss Spaetzle Gratin",
    description:
      "German spaetzle baked with sharp yellow cheddar, Swiss, Dijon, and buttered breadcrumbs.",
  },
  {
    name: "Petite Mixed Greens",
    description:
      "Cherry tomatoes, clementines, cucumber, breakfast radish, shallots, shaved parmesan, brown butter almonds, and citrus vinaigrette.",
  },
  {
    name: "Olive Focaccia",
    description: "Warm olive focaccia from Bakery2Go with whipped fennel butter.",
  },
  {
    name: "Black Forest Bread Pudding",
    description:
      "Dark chocolate and tart cherry bread pudding with vanilla chantilly and warm cherry wine sauce.",
  },
];

const gallery = [
  ["Sunday table", "/design-assets/b01.jpg"],
  ["Packed supper", "/design-assets/b02.jpg"],
  ["Chef detail", "/design-assets/b03.jpg"],
  ["Macon evening", "/design-assets/b04.jpg"],
  ["Dessert course", "/design-assets/b05.jpg"],
  ["Kitchen pass", "/design-assets/b06.jpg"],
];

async function main() {
  const existing = await prisma.menu.findFirst();
  if (!existing) {
    const menu = await prisma.menu.create({
      data: {
        title: "Sunday Supper",
        sundayDate: new Date("2026-05-31T21:00:00.000Z"),
        cutoffAt: new Date("2026-05-30T20:00:00.000Z"),
        status: "PUBLISHED",
        pickupNotes: "Pickup Sunday, 5-6pm ET at Grey Goose Players Club.",
      },
    });

    await prisma.menuItem.createMany({
      data: menuItems.map((item, index) => ({
        menuId: menu.id,
        sortOrder: index + 1,
        name: item.name,
        description: item.description,
      })),
    });
  }

  for (const [label, url] of gallery) {
    await prisma.siteImage.upsert({
      where: { id: label.toLowerCase().replace(/\s+/g, "-") },
      create: { id: label.toLowerCase().replace(/\s+/g, "-"), label, url, alt: label },
      update: { label, url, alt: label },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

