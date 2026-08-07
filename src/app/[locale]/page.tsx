import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  MapPin,
  CheckCircle2,
  Layers,
  Building2,
  Newspaper,
  Images,
  ShieldCheck,
  Cpu,
  Globe2,
  Sparkles,
} from "lucide-react";
import type { Sector, News, Event, Publication } from "@/generated/prisma/client";
import Reveal from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import AnimatedCounter from "@/components/AnimatedCounter";
import WaveDivider from "@/components/WaveDivider";
import { Phone } from "lucide-react";

const sectorIcons = [Cpu, Globe2, ShieldCheck, Layers, Sparkles, Building2];
const sectorColors = [
  "bg-blue-700",
  "bg-amber-500",
  "bg-emerald-600",
  "bg-rose-600",
  "bg-blue-600",
  "bg-amber-600",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();

  const [settings, sectors, news, events, publications, sectorCount, directorateCount, galleryCount, newsCount] =
    await Promise.all([
      prisma.siteSetting.findFirst().catch(() => null),
      prisma.sector.findMany({ orderBy: { order: "asc" }, take: 6 }).catch((): Sector[] => []),
      prisma.news.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }).catch((): News[] => []),
      prisma.event.findMany({
        where: { published: true, startDate: { gte: new Date() } },
        orderBy: { startDate: "asc" },
        take: 3,
      }).catch((): Event[] => []),
      prisma.publication.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }).catch((): Publication[] => []),
      prisma.sector.count().catch(() => 0),
      prisma.directorate.count().catch(() => 0),
      prisma.galleryItem.count().catch(() => 0),
      prisma.news.count().catch(() => 0),
    ]);

  const values = settings
    ? tf(settings, "values", l)
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

  const stats = [
    { label: t("home.statsSectors"), value: sectorCount, icon: Layers },
    { label: t("home.statsDirectorates"), value: directorateCount, icon: Building2 },
    { label: t("home.statsNews"), value: newsCount, icon: Newspaper },
    { label: t("home.statsGallery"), value: galleryCount, icon: Images },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-float rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 animate-float-slow rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-20 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-300">
              <Sparkles size={14} className="animate-pulse" /> {t("home.heroBadge")}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {t("siteName")}
            </h1>
            <p className="mt-4 max-w-xl text-blue-100">{t("home.heroSubtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-blue-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-500/30"
              >
                {t("hero.cta")} <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                {t("hero.contact")}
              </Link>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="flex justify-center">
            <div className="relative h-56 w-56 overflow-hidden rounded-full ring-8 ring-white/10 sm:h-72 sm:w-72">
              <div className="absolute inset-0 z-10 animate-float rounded-full bg-gradient-to-tr from-amber-400/20 via-transparent to-transparent" />
              <Image src="/logo.jpg" alt={t("siteNameShort")} fill sizes="288px" className="object-cover" />
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <Reveal direction="up" className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 text-center shadow-xl sm:grid-cols-4 sm:translate-y-10">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center gap-2 px-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Icon size={18} />
                  </span>
                  <span className="text-2xl font-extrabold text-blue-900">
                    <AnimatedCounter value={s.value} />
                  </span>
                  <span className="text-xs font-medium text-zinc-500">{s.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <WaveDivider color="#ffffff" className="relative z-0 mt-6" />
      </section>

      {/* Sectors */}
      {sectors.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:pt-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {t("home.sectorsBadge")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
              {t("home.sectorsTitle")}
            </h2>
            <p className="mt-3 text-sm text-zinc-600">{t("home.sectorsSubtitle")}</p>
          </Reveal>
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => {
              const Icon = sectorIcons[i % sectorIcons.length];
              const color = sectorColors[i % sectorColors.length];
              return (
                <StaggerItem
                  key={s.id}
                  className="group rounded-2xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${color}`}
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-semibold text-blue-900">{tf(s, "name", l)}</h3>
                  {s.headTitleAf && (
                    <p className="mt-1 text-xs font-medium text-blue-600">
                      {tf(s, "headTitle", l)}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-zinc-600 line-clamp-3">
                    {tf(s, "description", l)}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>
      )}

      {/* Bureau head / Call us */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
        <WaveDivider color="#ffffff" flip className="relative z-0" />
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 animate-float rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14">
          {settings?.bureauHeadMsgAf || settings?.bureauHeadMsgEn ? (
            <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center lg:col-span-1">
                <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-amber-400/60">
                  <div className="h-full w-full bg-blue-200" />
                </div>
                <p className="mt-4 font-semibold text-white">
                  {settings?.bureauHeadName}
                </p>
                <p className="text-sm text-amber-300">{t("home.bureauHead")}</p>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-white">
                  {t("home.bureauHead")}
                </h2>
                <p className="mt-3 leading-relaxed text-blue-100">
                  {tf(settings, "bureauHeadMsg", l)}
                </p>
              </div>
            </Reveal>
          ) : null}

          <Reveal
            direction="scale"
            className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-white/10 p-8 text-center backdrop-blur sm:flex-row sm:text-left"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{t("home.callUsTitle")}</h3>
              <p className="mt-1 text-sm text-blue-100">{t("home.callUsSubtitle")}</p>
            </div>
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex shrink-0 items-center gap-3 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-blue-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950 text-amber-300">
                  <Phone size={16} />
                </span>
                <span>
                  <span className="block text-[10px] font-normal uppercase text-blue-900/70">
                    {t("home.callUsLabel")}
                  </span>
                  {settings.phone}
                </span>
              </a>
            )}
          </Reveal>
        </div>
        <WaveDivider color="#ffffff" className="relative z-0" />
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {t("home.processBadge")}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
            {t("home.processTitle")}
          </h2>
          <p className="mt-3 text-sm text-zinc-600">{t("home.processSubtitle")}</p>
        </Reveal>
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: t("home.processStep1Title"), text: t("home.processStep1Text") },
            { title: t("home.processStep2Title"), text: t("home.processStep2Text") },
            { title: t("home.processStep3Title"), text: t("home.processStep3Text") },
          ].map((step, i) => (
            <StaggerItem key={step.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-xl font-extrabold text-white shadow-lg shadow-blue-800/30">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-blue-900">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{step.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Mission / Vision / Why choose us */}
      {settings && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal direction="right" className="relative">
              <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
                <Image
                  src="/uploads/gallery/504933020_4137395696507419_510841312649536551_n.jpg"
                  alt={t("about.title")}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden h-40 w-56 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block">
                <Image
                  src="/uploads/gallery/584221158_1370145271473842_1363217271285870021_n.jpg"
                  alt={t("about.title")}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-4 -top-4 hidden h-16 w-16 animate-float rounded-full bg-amber-400/30 blur-xl sm:block" />
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {t("home.whyBadge")}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">
                {t("home.whyTitle")}
              </h2>
              <p className="mt-3 text-sm text-zinc-600">{t("home.whySubtitle")}</p>
              <StaggerGroup className="mt-6 space-y-3">
                {values.map((v) => (
                  <StaggerItem key={v} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={18} />
                    <span className="text-sm text-zinc-700">{v}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-lg"
              >
                {t("hero.cta")} <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <Reveal className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {t("home.newsBadge")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">{t("home.newsTitle")}</h2>
          </div>
          <Link href="/news" className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline">
            {t("home.viewAll")} <ArrowRight size={14} />
          </Link>
        </Reveal>
        {news.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">{t("common.noResults")}</p>
        ) : (
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <StaggerItem key={n.id}>
                <Link
                  href={`/news/${n.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-blue-100">
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
                    <h3 className="mt-1 font-semibold text-blue-900 group-hover:text-blue-700">
                      {tf(n, "title", l)}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                      {tf(n, "excerpt", l)}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      {/* Events + Publications */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">
                {t("home.eventsTitle")}
              </h2>
              <Link href="/events" className="text-sm font-medium text-blue-700 hover:underline">
                {t("home.viewAll")}
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {events.length === 0 && (
                <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
              )}
              {events.map((e) => (
                <div
                  key={e.id}
                  className="flex gap-4 rounded-xl border border-zinc-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-800 text-white">
                    <span className="text-lg font-bold">
                      {new Date(e.startDate).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {new Date(e.startDate).toLocaleDateString(locale, { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">{tf(e, "title", l)}</h3>
                    {e.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                        <MapPin size={12} /> {e.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">
                {t("home.publicationsTitle")}
              </h2>
              <Link href="/publications" className="text-sm font-medium text-blue-700 hover:underline">
                {t("home.viewAll")}
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {publications.length === 0 && (
                <p className="text-sm text-zinc-500">{t("common.noResults")}</p>
              )}
              {publications.map((p) => (
                <a
                  key={p.id}
                  href={p.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                >
                  <FileText className="text-blue-700" size={20} />
                  <span className="text-sm font-medium text-zinc-800">{tf(p, "title", l)}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <Reveal direction="scale" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-8 py-12 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-float rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 animate-float-slow rounded-full bg-white/5 blur-3xl" />
          <h2 className="relative text-2xl font-bold sm:text-3xl">{t("home.ctaTitle")}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-sm text-blue-100">{t("home.ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-blue-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-500/30"
          >
            {t("home.ctaButton")} <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
