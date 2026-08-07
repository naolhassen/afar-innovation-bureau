import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import { MapPin } from "lucide-react";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  const events = await prisma.event
    .findMany({ where: { published: true }, orderBy: { startDate: "asc" } })
    .catch(() => []);

  return (
    <div>
      <PageHero title={t("nav.events")} />
      <section className="mx-auto max-w-5xl px-4 py-14">
        {events.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="space-y-4">
            {events.map((e) => (
              <StaggerItem key={e.id}>
                <Link
                  href={`/events/${e.id}`}
                  className="flex gap-4 rounded-xl border border-zinc-200 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-800 text-white">
                    <span className="text-xl font-bold">{new Date(e.startDate).getDate()}</span>
                    <span className="text-[10px] uppercase">
                      {new Date(e.startDate).toLocaleDateString(locale, { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">{tf(e, "title", l)}</h3>
                    <p className="mt-1 text-sm text-zinc-600 line-clamp-2">
                      {tf(e, "description", l)}
                    </p>
                    {e.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                        <MapPin size={12} /> {e.location}
                      </p>
                    )}
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
