import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import Image from "next/image";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const news = await prisma.news
    .findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } })
    .catch(() => []);

  return (
    <div>
      <PageHero title={t("nav.news")} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {news.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <StaggerItem key={n.id}>
                <Link
                  href={`/news/${n.slug}`}
                  className="group block overflow-hidden rounded-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-blue-100">
                    {n.coverImage && (
                      <Image
                        src={n.coverImage}
                        alt={tf(n, "title", l)}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-zinc-500">
                      {new Date(n.publishedAt).toLocaleDateString(locale)}
                    </p>
                    <h3 className="mt-1 font-semibold text-blue-900 group-hover:underline">
                      {tf(n, "title", l)}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{tf(n, "excerpt", l)}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
