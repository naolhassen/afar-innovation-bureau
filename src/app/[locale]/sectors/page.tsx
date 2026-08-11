import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import {
  Cpu,
  Globe,
  Database,
  ShieldCheck,
  Server,
  Building2,
  ShieldAlert,
  BookOpen,
  FileCheck2,
  Gauge,
  Wrench,
  BrainCircuit,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const icons: LucideIcon[] = [
  Cpu,
  Globe,
  Database,
  ShieldCheck,
  Server,
  Building2,
  ShieldAlert,
  BookOpen,
  FileCheck2,
  Gauge,
  Wrench,
  BrainCircuit,
];

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const sectors = await prisma.sector.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div>
      <PageHero title={t("nav.sectors")} subtitle={t("home.sectorsSubtitle")} />
      <section className="relative overflow-hidden bg-white px-4 py-20">
        <div className="cg-dot-pattern pointer-events-none absolute right-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="cg-eyebrow text-blue-600">{t("home.sectorsBadge")}</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              {t("home.sectorsTitle")}
            </h2>
          </div>

          {sectors.length === 0 ? (
            <p className="mt-10 text-center text-sm text-zinc-500">{t("common.noResults")}</p>
          ) : (
            <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((s, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <StaggerItem
                    key={s.id}
                    className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/15"
                  >
                    <span className="pointer-events-none absolute -top-2 right-3 select-none whitespace-nowrap text-5xl font-extrabold tracking-tight text-zinc-50">
                      {t("siteNameShort")}
                    </span>

                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-70 blur-[1px] transition-all duration-700 ease-out group-hover:-bottom-6 group-hover:-right-6 group-hover:h-40 group-hover:w-40 group-hover:opacity-90"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-14 -right-2 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-60 blur-[1px] transition-all duration-700 ease-out group-hover:-bottom-8 group-hover:-right-1 group-hover:h-28 group-hover:w-28 group-hover:opacity-80"
                    />

                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
                      <Icon size={22} />
                    </div>

                    <h3 className="relative z-10 mt-5 text-base font-bold leading-snug text-zinc-900">
                      {tf(s, "name", l)}
                    </h3>

                    {s.headTitleAf && (
                      <p className="relative z-10 mt-1 text-sm font-medium text-blue-600">
                        {tf(s, "headTitle", l)}
                      </p>
                    )}

                    {tf(s, "description", l) && (
                      <p className="relative z-10 mt-3 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-zinc-500">
                        {tf(s, "description", l)}
                      </p>
                    )}

                    <div className="relative z-10 mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-zinc-900">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white">
                        {t("home.readMore")}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
