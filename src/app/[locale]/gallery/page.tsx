import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import Image from "next/image";

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

  return (
    <div>
      <PageHero title={t("nav.gallery")} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((g) => (
              <StaggerItem
                key={g.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-blue-100"
              >
                <Image
                  src={g.imageUrl}
                  alt={tf(g, "title", l) || t("nav.gallery")}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
