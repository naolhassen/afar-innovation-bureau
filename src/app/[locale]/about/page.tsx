import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import HeroVisual from "@/components/HeroVisual";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { Target, Eye, Heart, type LucideIcon } from "lucide-react";

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

  const blocks: { title: string; text: string; icon: LucideIcon; gradient: string }[] = [
    {
      title: t("about.mission"),
      text: settings ? tf(settings, "mission", l) : "",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: t("about.vision"),
      text: settings ? tf(settings, "vision", l) : "",
      icon: Eye,
      gradient: "from-purple-500 to-blue-500",
    },
    {
      title: t("about.values"),
      text: settings ? tf(settings, "values", l) : "",
      icon: Heart,
      gradient: "from-pink-500 to-orange-400",
    },
  ];

  return (
    <div>
      <PageHero title={t("about.title")} />

      <section className="relative overflow-hidden bg-white px-4 py-20">
        <div className="cg-dot-pattern pointer-events-none absolute left-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-[22rem_1fr] lg:items-center">
          <Reveal direction="scale" className="flex justify-center">
            <HeroVisual src="/logo.png" alt={t("siteNameShort")} />
          </Reveal>

          <Reveal direction="left" delay={0.1}>
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
            {blocks.map((b) => {
              const Icon = b.icon;
              return (
                <StaggerItem
                  key={b.title}
                  className="group relative flex min-h-[13rem] flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/15"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${b.gradient} opacity-70 blur-[1px] transition-all duration-700 ease-out group-hover:-bottom-6 group-hover:-right-6 group-hover:h-40 group-hover:w-40 group-hover:opacity-90`}
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-14 -right-2 h-20 w-20 rounded-full bg-gradient-to-br ${b.gradient} opacity-50 blur-[1px] transition-all duration-700 ease-out group-hover:-bottom-8 group-hover:-right-1 group-hover:h-28 group-hover:w-28 group-hover:opacity-70`}
                  />

                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${b.gradient} text-white shadow-md`}
                  >
                    <Icon size={22} />
                  </div>

                  <h2 className="relative z-10 mt-5 text-lg font-bold text-zinc-900">{b.title}</h2>
                  <p className="relative z-10 mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-600">
                    {b.text || "—"}
                  </p>
                </StaggerItem>
              );
            })}
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
