"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      subject: form.get("subject"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder={t("name")}
          className="rounded-md border border-zinc-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-600 focus:outline-none"
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t("email")}
          className="rounded-md border border-zinc-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-600 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="phone"
          placeholder={t("phone")}
          className="rounded-md border border-zinc-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-600 focus:outline-none"
        />
        <input
          name="subject"
          placeholder={t("subject")}
          className="rounded-md border border-zinc-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-600 focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t("message")}
        className="w-full rounded-md border border-zinc-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-600 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-lg disabled:opacity-60"
      >
        {t("submit")}
      </button>
      {status === "success" && (
        <p className="text-sm font-medium text-blue-700">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{t("error")}</p>
      )}
    </form>
  );
}
