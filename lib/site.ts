import { prisma } from "@/lib/prisma";
import { isMenuCurrent } from "@/lib/ordering";

export async function getPublishedMenu() {
  const menus = await prisma.menu.findMany({
    where: { status: "PUBLISHED" },
    include: { items: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sundayDate: "asc" },
    take: 8,
  });
  return menus.find((menu) => isMenuCurrent(menu)) ?? null;
}

export async function getGalleryImages() {
  return prisma.siteImage.findMany({
    orderBy: { createdAt: "desc" },
    take: 9,
  });
}

export async function getOrderingOverride() {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["ordering_override_closed", "ordering_override_message"] } },
    });
    const values = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
    return {
      closed: values.ordering_override_closed === "true",
      message: values.ordering_override_message ?? "",
    };
  } catch {
    return { closed: false, message: "" };
  }
}
