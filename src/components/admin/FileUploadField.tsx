"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

export default function FileUploadField({
  name,
  label,
  defaultValue,
  accept = "image/*,application/pdf",
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  accept?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setUrl(data.url);
    } finally {
      setUploading(false);
    }
  }

  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(url);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-zinc-700">{label}</label>
      <div className="flex items-center gap-3">
        {url && (
          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-zinc-100">
            {isVideo ? (
              <video src={url} className="h-full w-full object-cover" muted />
            ) : (
              <Image src={url} alt="" fill sizes="64px" className="object-cover" />
            )}
          </div>
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-zinc-300 px-4 py-2.5 text-sm text-zinc-600 hover:border-emerald-500">
          <UploadCloud size={16} />
          {uploading ? "Uploading..." : "Choose file"}
          <input type="file" accept={accept} className="hidden" onChange={onFileChange} />
        </label>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
