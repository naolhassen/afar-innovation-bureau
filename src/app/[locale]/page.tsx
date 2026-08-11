import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
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
  Phone,
} from "lucide-react";
import type { Sector, News, Event, Publication } from "@/generated/prisma/client";
import Reveal from "@/components/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroVisual from "@/components/HeroVisual";
import HeroBackground from "@/components/HeroBackground";
import TextMarquee from "@/components/TextMarquee";

const sectorIcons = [Cpu, Globe2, ShieldCheck, Layers, Sparkles, Building2];

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
    <div className="bg-white">
      {/* Hero */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden pt-24 text-white lg:pt-28">
        <HeroBackground videoSrc="/video/hero-bg.mp4" posterSrc="/images/hero-bg.jpg" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="pointer-events-none absolute -right-40 top-0 z-10 h-[28rem] w-[28rem] animate-float rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 z-10 h-96 w-96 animate-float-slow rounded-full bg-purple-600/10 blur-[110px]" />

        <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-16 pt-32 text-center sm:pt-40">
          <Reveal direction="scale" className="relative z-10">
            <HeroVisual src="/logo.png" alt={t("siteNameShort")} />
          </Reveal>

          <Reveal direction="up" delay={0.1} className="relative z-10 mt-9 flex w-full flex-col items-center">
            <h1 className="max-w-xl whitespace-pre-line text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl lg:text-4xl">
              {t("siteName")}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70">
              {t("home.heroSubtitle")}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="relative z-10 flex w-full flex-col items-center">
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="cg-gradient-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
              >
                {t("hero.contact")} <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {t("hero.cta")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About / who we are */}
      <section className="relative overflow-hidden border-t border-zinc-100 bg-white px-4 py-20 text-zinc-900">
        <div className="cg-dot-pattern pointer-events-none absolute left-0 top-10 h-40 w-56 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative mx-auto max-w-md">
              <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-xl sm:h-80">
                <Image
                  src="/uploads/gallery/504933020_4137395696507419_510841312649536551_n.jpg"
                  alt={t("home.aboutTitle")}
                  fill
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 h-40 w-40 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white sm:h-48 sm:w-48">
                <Image
                  src="/uploads/gallery/763895322_1701124831144143_4555610229383186169_n.jpg"
                  alt={t("home.aboutTitle")}
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
              <div className="cg-gradient-btn absolute -bottom-6 left-0 rounded-xl px-5 py-4 text-white shadow-lg shadow-blue-900/30">
                <p className="text-2xl font-extrabold">
                  <AnimatedCounter value={directorateCount} />+
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/80">
                  {t("home.aboutStatLabel")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <span className="cg-eyebrow text-blue-600">{t("home.aboutBadge")}</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              {t("home.aboutTitle")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">{t("home.aboutText")}</p>
            <StaggerGroup className="mt-6 space-y-3">
              {[
                t("home.aboutPoint1"),
                t("home.aboutPoint2"),
                t("home.aboutPoint3"),
                t("home.aboutPoint4"),
              ].map((point) => (
                <StaggerItem key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={18} />
                  <span className="text-sm text-zinc-700">{point}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Link
              href="/about"
              className="cg-gradient-btn mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
            >
              {t("home.aboutCta")} <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Text carousel - core values */}
      {values.length > 0 && (
        <section className="cg-dark relative isolate overflow-hidden">
          <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-50" />
          <TextMarquee items={values} />
        </section>
      )}

      {/* Stats counter strip */}
      <section className="cg-dark relative isolate overflow-hidden">
        <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 animate-float rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 animate-float-slow rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} direction="up" className="flex flex-col items-center text-center">
                <span className="cg-gradient-btn flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg shadow-blue-900/30">
                  <Icon size={22} />
                </span>
                <p className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                  <AnimatedCounter value={s.value} />+
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/50">
                  {s.label}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Stats + mission checklist */}
      {settings && (
        <section className="relative overflow-hidden border-t border-zinc-100 bg-zinc-50 text-zinc-900">
          <div className="cg-grid-pattern-dark pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-300/20 blur-[100px]" />
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
            <Reveal>
              <span className="cg-eyebrow justify-center text-blue-600">
                {t("home.whyBadge")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                {t("home.whyTitle")}
              </h2>
              <p className="mt-3 text-sm text-zinc-500">{t("home.whySubtitle")}</p>
              <StaggerGroup className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
                {values.map((v) => (
                  <StaggerItem key={v} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={18} />
                    <span className="text-sm text-zinc-700">{v}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <Link
                href="/about"
                className="cg-gradient-btn mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
              >
                {t("hero.cta")} <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Sectors / Services */}
      {sectors.length > 0 && (
        <section className="relative overflow-hidden border-t border-zinc-100 bg-white px-4 py-20 text-zinc-900">
          <div className="cg-dot-pattern pointer-events-none absolute right-0 top-10 h-40 w-56 opacity-40" />
          <div className="cg-dot-pattern pointer-events-none absolute bottom-10 left-0 h-40 w-56 opacity-40" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="cg-eyebrow justify-center text-blue-600">
                {t("home.sectorsBadge")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                {t("home.sectorsTitle")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">{t("home.sectorsSubtitle")}</p>
            </Reveal>
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((s, i) => {
                const Icon = sectorIcons[i % sectorIcons.length];
                return (
                  <StaggerItem
                    key={s.id}
                    className="cg-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <span className="cg-gradient-btn absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    <span className="cg-gradient-btn flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={24} />
                    </span>
                    <h3 className="mt-4 font-semibold text-zinc-900">{tf(s, "name", l)}</h3>
                    {s.headTitleAf && (
                      <p className="mt-1 text-xs font-medium text-blue-600">
                        {tf(s, "headTitle", l)}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-zinc-500 line-clamp-3">
                      {tf(s, "description", l)}
                    </p>
                    <Link
                      href="/sectors"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-800"
                    >
                      {t("home.viewAll")} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Bureau head / Call us */}
      <section className="cg-dark relative isolate overflow-hidden text-white">
        <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 animate-float rounded-full bg-purple-600/25 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 animate-float-slow rounded-full bg-blue-600/25 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          {settings?.bureauHeadMsgAf || settings?.bureauHeadMsgEn ? (
            <Reveal className="cg-card-dark grid grid-cols-1 items-center gap-10 rounded-3xl p-8 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center lg:col-span-1">
                <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-blue-400/40">
                  <div className="cg-gradient-btn h-full w-full opacity-70" />
                </div>
                <p className="mt-4 font-semibold text-white">
                  {settings?.bureauHeadName}
                </p>
                <p className="text-sm text-blue-300">{t("home.bureauHead")}</p>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  {t("home.bureauHead")}
                </h2>
                <p className="mt-4 leading-relaxed text-white/60">
                  {tf(settings, "bureauHeadMsg", l)}
                </p>
              </div>
            </Reveal>
          ) : null}

          <Reveal
            direction="scale"
            className="cg-card-dark mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl p-8 text-center sm:flex-row sm:text-left"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{t("home.callUsTitle")}</h3>
              <p className="mt-1 text-sm text-white/55">{t("home.callUsSubtitle")}</p>
            </div>
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="cg-gradient-btn inline-flex shrink-0 items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Phone size={16} />
                </span>
                <span>
                  <span className="block text-[10px] font-normal uppercase text-white/80">
                    {t("home.callUsLabel")}
                  </span>
                  {settings.phone}
                </span>
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden border-t border-zinc-100 bg-white px-4 py-20 text-zinc-900">
        <div className="cg-grid-pattern-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="cg-eyebrow justify-center text-blue-600">
              {t("home.processBadge")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              {t("home.processTitle")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">{t("home.processSubtitle")}</p>
          </Reveal>
          <div className="pointer-events-none absolute inset-x-24 top-[62%] hidden border-t-2 border-dashed border-blue-200 sm:block" />
          <StaggerGroup className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { title: t("home.processStep1Title"), text: t("home.processStep1Text") },
              { title: t("home.processStep2Title"), text: t("home.processStep2Text") },
              { title: t("home.processStep3Title"), text: t("home.processStep3Text") },
            ].map((step, i) => (
              <StaggerItem key={step.title} className="cg-card relative rounded-2xl p-6 text-center">
                <div className="cg-gradient-btn mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-extrabold text-white shadow-lg shadow-blue-800/20">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{step.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* News */}
      <section className="relative overflow-hidden border-t border-zinc-100 bg-zinc-50 px-4 py-20 text-zinc-900">
        <div className="cg-dot-pattern pointer-events-none absolute right-6 top-8 h-36 w-48 opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="flex items-end justify-between">
            <div>
              <span className="cg-eyebrow text-blue-600">
                {t("home.newsBadge")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                {t("home.newsTitle")}
              </h2>
            </div>
            <Link href="/news" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
              {t("home.viewAll")} <ArrowRight size={14} />
            </Link>
          </Reveal>
          {news.length === 0 ? (
            <p className="mt-6 text-sm text-zinc-400">{t("common.noResults")}</p>
          ) : (
            <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <StaggerItem key={n.id}>
                  <Link
                    href={`/news/${n.slug}`}
                    className="cg-card group block overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
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
                      <p className="text-xs text-zinc-400">
                        {new Date(n.publishedAt).toLocaleDateString(locale)}
                      </p>
                      <h3 className="mt-1 font-semibold text-zinc-900 group-hover:text-blue-600">
                        {tf(n, "title", l)}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                        {tf(n, "excerpt", l)}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      {/* Events + Publications */}
      <section className="relative overflow-hidden border-t border-zinc-100 bg-white px-4 py-20 text-zinc-900">
        <div className="cg-grid-pattern-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
                {t("home.eventsTitle")}
              </h2>
              <Link href="/events" className="text-sm font-semibold text-blue-600 hover:underline">
                {t("home.viewAll")}
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {events.length === 0 && (
                <p className="text-sm text-zinc-400">{t("common.noResults")}</p>
              )}
              {events.map((e) => (
                <div
                  key={e.id}
                  className="cg-card flex gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300"
                >
                  <div className="cg-gradient-btn flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg text-white">
                    <span className="text-lg font-bold">
                      {new Date(e.startDate).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {new Date(e.startDate).toLocaleDateString(locale, { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">{tf(e, "title", l)}</h3>
                    {e.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
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
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
                {t("home.publicationsTitle")}
              </h2>
              <Link href="/publications" className="text-sm font-semibold text-blue-600 hover:underline">
                {t("home.viewAll")}
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {publications.length === 0 && (
                <p className="text-sm text-zinc-400">{t("common.noResults")}</p>
              )}
              {publications.map((p) => (
                <a
                  key={p.id}
                  href={p.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cg-card flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300"
                >
                  <FileText className="text-blue-600" size={20} />
                  <span className="text-sm font-medium text-zinc-700">{tf(p, "title", l)}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t border-zinc-100 bg-zinc-50 px-4 py-20">
        <Reveal
          direction="scale"
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-16 text-center text-white sm:px-16"
          style={{ background: "linear-gradient(120deg, #0a1330, #2b1c52)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          />
          <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-float rounded-full bg-blue-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 animate-float-slow rounded-full bg-purple-400/20 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold tracking-tight sm:text-4xl">{t("home.ctaTitle")}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">{t("home.ctaSubtitle")}</p>
          <Link
            href="/contact"
            className="cg-gradient-btn relative mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
          >
            {t("home.ctaButton")} <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
