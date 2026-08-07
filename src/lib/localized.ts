import type { Locale } from "@/i18n/routing";

const suffix: Record<Locale, string> = { af: "Af", am: "Am", en: "En" };

export function tf<T extends Record<string, unknown>>(
  record: T,
  field: string,
  locale: Locale
): string {
  const key = `${field}${suffix[locale]}`;
  const value = record[key as keyof T];
  return (value as string) ?? "";
}
