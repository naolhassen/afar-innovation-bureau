import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import {
  Building2,
  Cpu,
  Globe2,
  ShieldCheck,
  Layers,
  Sparkles,
  FileText,
  Monitor,
  Wifi,
  Database,
  Lock,
  Server,
  type LucideIcon,
} from "lucide-react";

const directorateIcons: LucideIcon[] = [
  Building2,
  Cpu,
  Globe2,
  ShieldCheck,
  Layers,
  Sparkles,
  FileText,
  Monitor,
  Wifi,
  Database,
  Lock,
  Server,
];

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-blue-500",
  "from-pink-500 to-orange-400",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-red-500",
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-blue-500",
  "from-lime-500 to-green-500",
  "from-fuchsia-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-yellow-500",
];

export default async function DirectoratesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const directorates = await prisma.directorate
    .findMany({ orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <div>
      <PageHero title={t("nav.directorates")} />
      <section className="relative overflow-hidden bg-white px-4 py-20">
        <div className="cg-dot-pattern pointer-events-none absolute right-0 top-10 h-40 w-56 opacity-40" />
        <div className="cg-dot-pattern pointer-events-none absolute bottom-10 left-0 h-40 w-56 opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          {directorates.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">{t("common.noResults")}</p>
          ) : (
            <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {directorates.map((d, i) => {
                const Icon = directorateIcons[i % directorateIcons.length];
                const gradient = gradients[i % gradients.length];
                return (
                  <StaggerItem
                    key={d.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/10"
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${gradient} transition-transform duration-500 group-hover:scale-x-100`}
                    />
                    <div
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-blue-900/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon size={26} />
                    </div>
                    <h2 className="relative z-10 mt-5 text-lg font-bold text-zinc-900">
                      {tf(d, "name", l)}
                    </h2>
                    <p className="relative z-10 mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-600">
                      {tf(d, "description", l)}
                    </p>
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
