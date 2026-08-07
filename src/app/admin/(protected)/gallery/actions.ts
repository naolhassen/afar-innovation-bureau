"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGalleryItem(formData: FormData) {
  const imageUrl = String(formData.get("imageUrl") ?? "");
  if (!imageUrl) return;

  await prisma.galleryItem.create({
    data: {
      imageUrl,
      titleAf: String(formData.get("titleAf") ?? "") || null,
      titleAm: String(formData.get("titleAm") ?? "") || null,
      titleEn: String(formData.get("titleEn") ?? "") || null,
    },
  });

  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}
