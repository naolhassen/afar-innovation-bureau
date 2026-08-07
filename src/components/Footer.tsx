import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { Phone, Mail } from "lucide-react";
import {
  FacebookIcon,
  TelegramIcon,
  XIcon,
  InstagramIcon,
  YoutubeIcon,
} from "./icons/SocialIcons";

export default async function Footer() {
  const t = await getTranslations();
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
    <footer className="bg-blue-950 text-blue-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{t("siteNameShort")}</p>
          <p className="mt-2 text-sm text-blue-200/80">{t("siteName")}</p>
          <div className="mt-4 space-y-1 text-sm">
            {settings?.phone && (
              <p className="flex items-center gap-2">
                <Phone size={14} /> {settings.phone}
              </p>
            )}
            {settings?.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} /> {settings.email}
              </p>
            )}
          </div>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-amber-400 hover:text-blue-950"
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
                <Link href={l.href} className="hover:text-white">
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
              <Link href="/directorates" className="hover:text-white">
                {t("nav.directorates")}
              </Link>
            </li>
            <li>
              <Link href="/publications" className="hover:text-white">
                {t("nav.publications")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">{t("contact.title")}</p>
          <Link
            href="/contact"
            className="mt-3 inline-block rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-blue-950 transition-colors hover:bg-amber-300"
          >
            {t("hero.contact")}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-300/70">
        &copy; {new Date().getFullYear()} {t("siteNameShort")} — {t("footer.rights")}
      </div>
    </footer>
  );
}
