import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const settings = await prisma.siteSetting.findFirst().catch(() => null);

  const blocks = [
    { title: t("about.mission"), text: settings ? tf(settings, "mission", l) : "" },
    { title: t("about.vision"), text: settings ? tf(settings, "vision", l) : "" },
    { title: t("about.values"), text: settings ? tf(settings, "values", l) : "" },
  ];

  return (
    <div>
      <PageHero title={t("about.title")} />
      <section className="mx-auto max-w-5xl px-4 py-14">
        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {blocks.map((b) => (
            <StaggerItem
              key={b.title}
              className="rounded-xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <h2 className="text-lg font-bold text-blue-900">{b.title}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                {b.text || "—"}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {settings?.historyAf || settings?.historyEn ? (
          <Reveal className="mt-10 rounded-xl border border-zinc-200 p-8">
            <h2 className="text-xl font-bold text-blue-900">{t("about.history")}</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-zinc-700">
              {tf(settings, "history", l)}
            </p>
          </Reveal>
        ) : null}

        {settings?.bureauHeadMsgAf || settings?.bureauHeadMsgEn ? (
          <Reveal className="mt-10 grid grid-cols-1 gap-8 rounded-xl bg-blue-50 p-8 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full bg-blue-200" />
              <p className="mt-4 font-semibold text-blue-900">{settings?.bureauHeadName}</p>
              <p className="text-sm text-blue-700">{t("home.bureauHead")}</p>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-blue-900">{t("home.bureauHead")}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-zinc-700">
                {tf(settings, "bureauHeadMsg", l)}
              </p>
            </div>
          </Reveal>
        ) : null}
      </section>
    </div>
  );
}
