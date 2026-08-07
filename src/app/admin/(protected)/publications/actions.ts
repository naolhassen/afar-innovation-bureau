"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function readFields(formData: FormData) {
  return {
    titleAf: String(formData.get("titleAf") ?? ""),
    titleAm: String(formData.get("titleAm") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    descriptionAf: String(formData.get("descriptionAf") ?? "") || null,
    descriptionAm: String(formData.get("descriptionAm") ?? "") || null,
    descriptionEn: String(formData.get("descriptionEn") ?? "") || null,
    fileUrl: String(formData.get("fileUrl") ?? ""),
    coverImage: String(formData.get("coverImage") ?? "") || null,
    published: formData.get("published") === "on",
  };
}

export async function createPublication(formData: FormData) {
  await prisma.publication.create({ data: readFields(formData) });
  revalidatePath("/admin/publications");
  redirect("/admin/publications");
}

export async function updatePublication(id: string, formData: FormData) {
  await prisma.publication.update({ where: { id }, data: readFields(formData) });
  revalidatePath("/admin/publications");
  redirect("/admin/publications");
}

export async function deletePublication(id: string) {
  await prisma.publication.delete({ where: { id } });
  revalidatePath("/admin/publications");
}
