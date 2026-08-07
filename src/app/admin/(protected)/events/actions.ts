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

function readEventFields(formData: FormData) {
  const startDateRaw = String(formData.get("startDate") ?? "");
  const endDateRaw = String(formData.get("endDate") ?? "");
  return {
    titleAf: String(formData.get("titleAf") ?? ""),
    titleAm: String(formData.get("titleAm") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    descriptionAf: String(formData.get("descriptionAf") ?? ""),
    descriptionAm: String(formData.get("descriptionAm") ?? ""),
    descriptionEn: String(formData.get("descriptionEn") ?? ""),
    location: String(formData.get("location") ?? "") || null,
    coverImage: String(formData.get("coverImage") ?? "") || null,
    startDate: startDateRaw ? new Date(startDateRaw) : new Date(),
    endDate: endDateRaw ? new Date(endDateRaw) : null,
    published: formData.get("published") === "on",
  };
}

export async function createEvent(formData: FormData) {
  const fields = readEventFields(formData);
  const baseSlug = slugify(fields.titleEn) || `event-${Date.now()}`;

  await prisma.event.create({ data: { slug: baseSlug, ...fields } });
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  const fields = readEventFields(formData);
  await prisma.event.update({ where: { id }, data: fields });
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}
