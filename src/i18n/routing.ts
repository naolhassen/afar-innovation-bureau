import { defineRouting } from "next-intl/routing";

export const locales = ["af", "am", "en"] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  af: "Qafar",
  am: "አማርኛ",
  en: "English",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "af",
  localePrefix: "always",
});
