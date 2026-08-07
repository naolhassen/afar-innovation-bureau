"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function readFields(formData: FormData) {
  return {
    order: Number(formData.get("order") ?? 0),
    questionAf: String(formData.get("questionAf") ?? ""),
    questionAm: String(formData.get("questionAm") ?? ""),
    questionEn: String(formData.get("questionEn") ?? ""),
    answerAf: String(formData.get("answerAf") ?? ""),
    answerAm: String(formData.get("answerAm") ?? ""),
    answerEn: String(formData.get("answerEn") ?? ""),
  };
}

export async function createFaq(formData: FormData) {
  await prisma.faqItem.create({ data: readFields(formData) });
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaq(id: string, formData: FormData) {
  await prisma.faqItem.update({ where: { id }, data: readFields(formData) });
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaq(id: string) {
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
}
