"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/sectors", label: t("nav.sectors") },
    { href: "/directorates", label: t("nav.directorates") },
    { href: "/news", label: t("nav.news") },
    { href: "/events", label: t("nav.events") },
    { href: "/publications", label: t("nav.publications") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        solid
          ? "border-b border-zinc-100 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-white/10 bg-transparent"
      }`}
    >
      <div
        className={`hidden border-b sm:block ${
          solid
            ? "border-zinc-100 bg-zinc-50 text-zinc-500"
            : "border-white/10 bg-white/5 text-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={12} /> +251-XX-XXX-XXXX
            </span>
            <span className="flex items-center gap-1">
              <Mail size={12} /> itdb@afar.gov.et
            </span>
          </div>
          <LocaleSwitcher light={solid} />
        </div>
      </div>

      <div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ${
                solid ? "ring-zinc-100" : "ring-white/20"
              }`}
            >
              <Image src="/logo.jpg" alt={t("siteNameShort")} fill sizes="44px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <p className={`text-sm font-bold ${solid ? "text-zinc-900" : "text-white"}`}>
                {t("siteNameShort")}
              </p>
              <p
                className={`hidden text-[11px] sm:block ${
                  solid ? "text-zinc-400" : "text-white/50"
                }`}
              >
                {t("siteName")}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((l) => {
              const active =
                pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative text-sm font-medium transition-colors ${
                    solid
                      ? active
                        ? "text-blue-700"
                        : "text-zinc-600 hover:text-blue-700"
                      : active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`cg-gradient-btn absolute -bottom-1.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <LocaleSwitcher light={solid} />
            </div>
            <button
              className={`rounded-md p-2 lg:hidden ${solid ? "text-zinc-700" : "text-white"}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-zinc-100 bg-white px-4 py-3 lg:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-blue-700"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
