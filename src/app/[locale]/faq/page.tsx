import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const faqs = await prisma.faqItem.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div>
      <PageHero title={t("nav.faq")} />
      <section className="mx-auto max-w-3xl px-4 py-14">
        {faqs.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="space-y-4">
            {faqs.map((f) => (
              <StaggerItem key={f.id}>
                <details className="group rounded-xl border border-zinc-200 p-5 transition-colors hover:border-blue-200">
                  <summary className="cursor-pointer font-semibold text-blue-900">
                    {tf(f, "question", l)}
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                    {tf(f, "answer", l)}
                  </p>
                </details>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
