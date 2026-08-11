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

      <section className="relative overflow-hidden bg-white px-4 py-20">
        <div className="cg-dot-pattern pointer-events-none absolute left-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              {t("about.duties")}
            </h2>
            <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-zinc-600 sm:text-base">
              {t("about.dutiesText")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-100 bg-zinc-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {blocks.map((b) => (
              <StaggerItem
                key={b.title}
                className="cg-card rounded-2xl border border-zinc-100 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <h2 className="text-lg font-bold text-blue-900">{b.title}</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                  {b.text || "—"}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {settings?.historyAf || settings?.historyEn ? (
            <Reveal className="mt-10 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-blue-900">{t("about.history")}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-zinc-700">
                {tf(settings, "history", l)}
              </p>
            </Reveal>
          ) : null}

          {settings?.bureauHeadMsgAf || settings?.bureauHeadMsgEn ? (
            <Reveal className="cg-gradient-btn mt-10 grid grid-cols-1 gap-8 rounded-2xl p-8 text-white lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="h-32 w-32 rounded-full bg-white/20" />
                <p className="mt-4 font-semibold text-white">{settings?.bureauHeadName}</p>
                <p className="text-sm text-white/70">{t("home.bureauHead")}</p>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-white">{t("home.bureauHead")}</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-white/85">
                  {tf(settings, "bureauHeadMsg", l)}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>
    </div>
  );
}
