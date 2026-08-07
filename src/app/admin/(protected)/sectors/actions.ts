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
    headTitleAf: String(formData.get("headTitleAf") ?? "") || null,
    headTitleAm: String(formData.get("headTitleAm") ?? "") || null,
    headTitleEn: String(formData.get("headTitleEn") ?? "") || null,
    descriptionAf: String(formData.get("descriptionAf") ?? "") || null,
    descriptionAm: String(formData.get("descriptionAm") ?? "") || null,
    descriptionEn: String(formData.get("descriptionEn") ?? "") || null,
  };
}

export async function createSector(formData: FormData) {
  await prisma.sector.create({ data: readFields(formData) });
  revalidatePath("/admin/sectors");
  redirect("/admin/sectors");
}

export async function updateSector(id: string, formData: FormData) {
  await prisma.sector.update({ where: { id }, data: readFields(formData) });
  revalidatePath("/admin/sectors");
  redirect("/admin/sectors");
}

export async function deleteSector(id: string) {
  await prisma.sector.delete({ where: { id } });
  revalidatePath("/admin/sectors");
}
