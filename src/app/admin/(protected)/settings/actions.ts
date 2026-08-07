"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(formData: FormData) {
  const data = {
    missionAf: String(formData.get("missionAf") ?? "") || null,
    missionAm: String(formData.get("missionAm") ?? "") || null,
    missionEn: String(formData.get("missionEn") ?? "") || null,
    visionAf: String(formData.get("visionAf") ?? "") || null,
    visionAm: String(formData.get("visionAm") ?? "") || null,
    visionEn: String(formData.get("visionEn") ?? "") || null,
    valuesAf: String(formData.get("valuesAf") ?? "") || null,
    valuesAm: String(formData.get("valuesAm") ?? "") || null,
    valuesEn: String(formData.get("valuesEn") ?? "") || null,
    historyAf: String(formData.get("historyAf") ?? "") || null,
    historyAm: String(formData.get("historyAm") ?? "") || null,
    historyEn: String(formData.get("historyEn") ?? "") || null,
    bureauHeadMsgAf: String(formData.get("bureauHeadMsgAf") ?? "") || null,
    bureauHeadMsgAm: String(formData.get("bureauHeadMsgAm") ?? "") || null,
    bureauHeadMsgEn: String(formData.get("bureauHeadMsgEn") ?? "") || null,
    bureauHeadName: String(formData.get("bureauHeadName") ?? "") || null,
    phone: String(formData.get("phone") ?? "") || null,
    email: String(formData.get("email") ?? "") || null,
    addressAf: String(formData.get("addressAf") ?? "") || null,
    addressAm: String(formData.get("addressAm") ?? "") || null,
    addressEn: String(formData.get("addressEn") ?? "") || null,
    facebookUrl: String(formData.get("facebookUrl") ?? "") || null,
    telegramUrl: String(formData.get("telegramUrl") ?? "") || null,
    twitterUrl: String(formData.get("twitterUrl") ?? "") || null,
    instagramUrl: String(formData.get("instagramUrl") ?? "") || null,
    youtubeUrl: String(formData.get("youtubeUrl") ?? "") || null,
  };

  const existing = await prisma.siteSetting.findFirst();

  if (existing) {
    await prisma.siteSetting.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSetting.create({ data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
