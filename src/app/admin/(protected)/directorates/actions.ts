"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function readFields(formData: FormData) {
  return {
    order: Number(formData.get("order") ?? 0),
    nameAf: String(formData.get("nameAf") ?? ""),
    nameAm: String(formData.get("nameAm") ?? ""),
    nameEn: String(formData.get("nameEn") ?? ""),
    descriptionAf: String(formData.get("descriptionAf") ?? "") || null,
    descriptionAm: String(formData.get("descriptionAm") ?? "") || null,
    descriptionEn: String(formData.get("descriptionEn") ?? "") || null,
  };
}

export async function createDirectorate(formData: FormData) {
  await prisma.directorate.create({ data: readFields(formData) });
  revalidatePath("/admin/directorates");
  redirect("/admin/directorates");
}

export async function updateDirectorate(id: string, formData: FormData) {
  await prisma.directorate.update({ where: { id }, data: readFields(formData) });
  revalidatePath("/admin/directorates");
  redirect("/admin/directorates");
}

export async function deleteDirectorate(id: string) {
  await prisma.directorate.delete({ where: { id } });
  revalidatePath("/admin/directorates");
}
