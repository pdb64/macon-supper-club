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
