"use client";

import { useState } from "react";
import FileUploadField from "@/components/admin/FileUploadField";

export default function GalleryForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [type, setType] = useState<"IMAGE" | "VIDEO">("IMAGE");

  return (
    <form
      action={action}
      className="mt-6 max-w-lg space-y-4 rounded-xl border border-zinc-200 bg-white p-5"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Media Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType("IMAGE")}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              type === "IMAGE"
                ? "bg-emerald-800 text-white"
                : "border border-zinc-300 text-zinc-600"
            }`}
          >
            Photo
          </button>
          <button
            type="button"
            onClick={() => setType("VIDEO")}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              type === "VIDEO"
                ? "bg-emerald-800 text-white"
                : "border border-zinc-300 text-zinc-600"
            }`}
          >
            Video
          </button>
        </div>
        <input type="hidden" name="type" value={type} />
      </div>

      <FileUploadField
        name="imageUrl"
        label={type === "VIDEO" ? "Video File" : "Image"}
        accept={type === "VIDEO" ? "video/*" : "image/*"}
      />

      <div className="grid grid-cols-3 gap-3">
        <input
          name="titleAf"
          placeholder="Title (Afar)"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
        <input
          name="titleAm"
          placeholder="Title (Amharic)"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
        <input
          name="titleEn"
          placeholder="Title (English)"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Add to Gallery
      </button>
    </form>
  );
}
