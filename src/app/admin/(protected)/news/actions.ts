"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createNews(formData: FormData) {
  const titleEn = String(formData.get("titleEn") ?? "");
  const baseSlug = slugify(titleEn) || `news-${Date.now()}`;

  await prisma.news.create({
    data: {
      slug: baseSlug,
      titleAf: String(formData.get("titleAf") ?? ""),
      titleAm: String(formData.get("titleAm") ?? ""),
      titleEn,
      excerptAf: String(formData.get("excerptAf") ?? ""),
      excerptAm: String(formData.get("excerptAm") ?? ""),
      excerptEn: String(formData.get("excerptEn") ?? ""),
      contentAf: String(formData.get("contentAf") ?? ""),
      contentAm: String(formData.get("contentAm") ?? ""),
      contentEn: String(formData.get("contentEn") ?? ""),
      coverImage: String(formData.get("coverImage") ?? "") || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(id: string, formData: FormData) {
  await prisma.news.update({
    where: { id },
    data: {
      titleAf: String(formData.get("titleAf") ?? ""),
      titleAm: String(formData.get("titleAm") ?? ""),
      titleEn: String(formData.get("titleEn") ?? ""),
      excerptAf: String(formData.get("excerptAf") ?? ""),
      excerptAm: String(formData.get("excerptAm") ?? ""),
      excerptEn: String(formData.get("excerptEn") ?? ""),
      contentAf: String(formData.get("contentAf") ?? ""),
      contentAm: String(formData.get("contentAm") ?? ""),
      contentEn: String(formData.get("contentEn") ?? ""),
      coverImage: String(formData.get("coverImage") ?? "") || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  await prisma.news.delete({ where: { id } });
  revalidatePath("/admin/news");
}
