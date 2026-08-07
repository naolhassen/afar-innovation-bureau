"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="hidden bg-blue-900 text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={12} /> +251-XX-XXX-XXXX
            </span>
            <span className="flex items-center gap-1">
              <Mail size={12} /> itdb@afar.gov.et
            </span>
          </div>
          <LocaleSwitcher />
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image src="/logo.jpg" alt={t("siteNameShort")} fill sizes="44px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-blue-900">
                {t("siteNameShort")}
              </p>
              <p className="hidden text-[11px] text-zinc-500 sm:block">
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
                  className={`group relative text-sm font-medium transition-colors hover:text-blue-700 ${
                    active ? "text-blue-700" : "text-zinc-700"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <LocaleSwitcher />
            </div>
            <button
              className="rounded-md p-2 text-blue-900 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-zinc-100 px-4 py-3 lg:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
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
