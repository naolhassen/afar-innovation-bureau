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
                    className="cg-card group relative overflow-hidden rounded-2xl border border-zinc-100 p-7 transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <span className="pointer-events-none absolute right-4 top-3 text-4xl font-extrabold text-zinc-100 transition-colors group-hover:text-blue-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="cg-gradient-btn relative z-10 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg shadow-blue-900/20">
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
                      <p className="relative z-10 mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-500">
                        {tf(s, "description", l)}
                      </p>
                    )}
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
