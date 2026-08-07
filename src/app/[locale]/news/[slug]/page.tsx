import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const item = await prisma.news.findUnique({ where: { slug } }).catch(() => null);
  if (!item || !item.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm text-zinc-500">
        {new Date(item.publishedAt).toLocaleDateString(locale)}
      </p>
      <h1 className="mt-2 text-2xl font-extrabold text-blue-900 sm:text-3xl">
        {tf(item, "title", l)}
      </h1>
      {item.coverImage && (
        <div className="relative mt-6 h-64 w-full overflow-hidden rounded-xl bg-blue-100 sm:h-96">
          <Image
            src={item.coverImage}
            alt={tf(item, "title", l)}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="prose prose-blue mt-8 max-w-none whitespace-pre-line leading-relaxed text-zinc-800">
        {tf(item, "content", l)}
      </div>
    </article>
  );
}
