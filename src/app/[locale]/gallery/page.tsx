import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const items = await prisma.galleryItem
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const galleryItems = items.map((g) => ({
    id: g.id,
    title: tf(g, "title", l) || "",
    imageUrl: g.imageUrl,
    type: g.type,
  }));

  return (
    <div>
      <PageHero title={t("nav.gallery")} />
      <section className="relative overflow-hidden bg-white px-4 py-16">
        <div className="cg-dot-pattern pointer-events-none absolute right-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          <GalleryGrid
            items={galleryItems}
            labels={{
              all: t("gallery.all"),
              photos: t("gallery.photos"),
              videos: t("gallery.videos"),
              noResults: t("common.noResults"),
            }}
          />
        </div>
      </section>
    </div>
  );
}
