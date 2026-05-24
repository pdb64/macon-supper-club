import { prisma } from "@/lib/prisma";

export async function getPublishedMenu() {
  return prisma.menu.findFirst({
    where: { status: "PUBLISHED" },
    include: { items: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sundayDate: "asc" },
  });
}

export async function getGalleryImages() {
  return prisma.siteImage.findMany({
    orderBy: { createdAt: "desc" },
    take: 9,
  });
}

