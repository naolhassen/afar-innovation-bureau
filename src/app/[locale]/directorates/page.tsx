import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";

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
      <section className="mx-auto max-w-6xl px-4 py-14">
        {directorates.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {directorates.map((d) => (
              <StaggerItem
                key={d.id}
                className="rounded-xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <h2 className="font-bold text-blue-900">{tf(d, "name", l)}</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                  {tf(d, "description", l)}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
