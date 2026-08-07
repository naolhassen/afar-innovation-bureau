import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { FileText, Download } from "lucide-react";

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const publications = await prisma.publication
    .findMany({ where: { published: true }, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div>
      <PageHero title={t("nav.publications")} />
      <section className="mx-auto max-w-5xl px-4 py-14">
        {publications.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {publications.map((p) => (
              <StaggerItem key={p.id}>
                <a
                  href={p.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="text-blue-700" size={22} />
                    <span>
                      <span className="block text-sm font-semibold text-zinc-800">
                        {tf(p, "title", l)}
                      </span>
                      {p.descriptionAf && (
                        <span className="block text-xs text-zinc-500">
                          {tf(p, "description", l)}
                        </span>
                      )}
                    </span>
                  </span>
                  <Download size={16} className="text-blue-700" />
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
