import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import { notFound } from "next/navigation";
import { MapPin, Calendar } from "lucide-react";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const item = await prisma.event.findUnique({ where: { id } }).catch(() => null);
  if (!item || !item.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-36">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
        {tf(item, "title", l)}
      </h1>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-600">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {new Date(item.startDate).toLocaleDateString(locale)}
          {item.endDate ? ` – ${new Date(item.endDate).toLocaleDateString(locale)}` : ""}
        </span>
        {item.location && (
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {item.location}
          </span>
        )}
      </div>
      <div className="cg-gradient-btn mt-6 h-64 rounded-xl opacity-20" />
      <div className="prose prose-blue mt-8 max-w-none whitespace-pre-line leading-relaxed text-zinc-800">
        {tf(item, "description", l)}
      </div>
    </article>
  );
}
