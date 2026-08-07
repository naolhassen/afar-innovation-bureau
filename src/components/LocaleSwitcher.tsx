"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelect(next: string) {
    router.replace(
      // @ts-expect-error dynamic pathname/params pair
      { pathname, params },
      { locale: next }
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/30 bg-white/10 p-1 text-xs font-medium">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => onSelect(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            l === locale
              ? "bg-white text-blue-800"
              : "text-white hover:bg-white/20"
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}
