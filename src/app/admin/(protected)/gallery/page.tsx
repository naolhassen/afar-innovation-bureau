import { prisma } from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import FileUploadField from "@/components/admin/FileUploadField";
import { createGalleryItem, deleteGalleryItem } from "./actions";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-emerald-900">Gallery</h1>

      <form action={createGalleryItem} className="mt-6 max-w-lg space-y-4 rounded-xl border border-zinc-200 bg-white p-5">
        <FileUploadField name="imageUrl" label="Image" />
        <div className="grid grid-cols-3 gap-3">
          <input name="titleAf" placeholder="Title (Afar)" className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
          <input name="titleAm" placeholder="Title (Amharic)" className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
          <input name="titleEn" placeholder="Title (English)" className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
        </div>
        <button type="submit" className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">
          Add to Gallery
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={g.imageUrl}
              alt={g.titleEn ?? ""}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
            <form
              action={async () => {
                "use server";
                await deleteGalleryItem(g.id);
              }}
              className="absolute right-2 top-2"
            >
              <button
                type="submit"
                className="rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </form>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-sm text-zinc-500">No images yet.</p>
        )}
      </div>
    </div>
  );
}
