import { prisma } from "@/lib/prisma";
import { Trash2, Play } from "lucide-react";
import Image from "next/image";
import GalleryForm from "@/components/admin/GalleryForm";
import { createGalleryItem, deleteGalleryItem } from "./actions";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-emerald-900">Gallery</h1>

      <GalleryForm action={createGalleryItem} />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
            {g.type === "VIDEO" ? (
              <video src={g.imageUrl} className="h-full w-full object-cover" muted />
            ) : (
              <Image
                src={g.imageUrl}
                alt={g.titleEn ?? ""}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            )}
            {g.type === "VIDEO" && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="text-white" size={28} />
              </div>
            )}
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
