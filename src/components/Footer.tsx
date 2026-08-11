import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { tf } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  TelegramIcon,
  XIcon,
  InstagramIcon,
  YoutubeIcon,
} from "./icons/SocialIcons";

export default async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const settings = await prisma.siteSetting.findFirst().catch(() => null);

  const socials = [
    { href: settings?.facebookUrl, icon: FacebookIcon },
    { href: settings?.telegramUrl, icon: TelegramIcon },
    { href: settings?.twitterUrl, icon: XIcon },
    { href: settings?.instagramUrl, icon: InstagramIcon },
    { href: settings?.youtubeUrl, icon: YoutubeIcon },
  ].filter((s) => s.href);

  const usefulLinks = [
    { href: "/news", label: t("nav.news") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/about", label: t("nav.about") },
    { href: "/events", label: t("nav.events") },
    { href: "/sectors", label: t("nav.sectors") },
    { href: "/faq", label: t("nav.faq") },
  ];

  return (
    <footer className="cg-dark relative isolate overflow-hidden text-white/60">
      <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[110px]" />
      <div className="relative z-10 border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <span className="cg-gradient-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
              <MapPin size={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">{t("footer.headOffice")}</p>
              <p className="mt-0.5 text-sm font-medium text-white">
                {settings ? tf(settings, "address", locale) : t("footer.headOfficeFallback")}
              </p>
            </div>
          </div>
          {settings?.phone && (
            <div className="flex items-center gap-4">
              <span className="cg-gradient-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
                <Phone size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">{t("footer.callUs")}</p>
                <p className="mt-0.5 text-sm font-medium text-white">{settings.phone}</p>
              </div>
            </div>
          )}
          {settings?.email && (
            <div className="flex items-center gap-4">
              <span className="cg-gradient-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
                <Mail size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">{t("footer.emailUs")}</p>
                <p className="mt-0.5 text-sm font-medium text-white">{settings.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{t("siteNameShort")}</p>
          <p className="mt-2 text-sm text-white/45">{t("siteName")}</p>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/5 p-2 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-blue-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="font-semibold text-white">{t("footer.usefulLinks")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {usefulLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-blue-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">{t("footer.directorates")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/directorates" className="transition-colors hover:text-blue-300">
                {t("nav.directorates")}
              </Link>
            </li>
            <li>
              <Link href="/publications" className="transition-colors hover:text-blue-300">
                {t("nav.publications")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">{t("contact.title")}</p>
          <Link
            href="/contact"
            className="cg-gradient-btn mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
          >
            {t("hero.contact")}
          </Link>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-5 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} {t("siteNameShort")} — {t("footer.rights")}
      </div>
    </footer>
  );
}
