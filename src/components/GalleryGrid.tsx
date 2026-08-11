"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, Play, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/StaggerGroup";

type GalleryEntry = {
  id: string;
  title: string;
  imageUrl: string;
  type: "IMAGE" | "VIDEO";
};

export default function GalleryGrid({
  items,
  labels,
}: {
  items: GalleryEntry[];
  labels: { all: string; photos: string; videos: string; noResults: string };
}) {
  const [filter, setFilter] = useState<"ALL" | "IMAGE" | "VIDEO">("ALL");
  const [active, setActive] = useState<GalleryEntry | null>(null);

  const filtered = useMemo(
    () => (filter === "ALL" ? items : items.filter((i) => i.type === filter)),
    [items, filter]
  );

  const tabs: { key: "ALL" | "IMAGE" | "VIDEO"; label: string }[] = [
    { key: "ALL", label: labels.all },
    { key: "IMAGE", label: labels.photos },
    { key: "VIDEO", label: labels.videos },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              filter === tab.key
                ? "cg-gradient-btn text-white shadow-lg shadow-blue-900/30"
                : "border border-zinc-200 text-zinc-600 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-500">{labels.noResults}</p>
      ) : (
        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <StaggerItem
              key={item.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-zinc-100 shadow-sm"
              onClick={() => setActive(item)}
            >
              {item.type === "VIDEO" ? (
                <video src={item.imageUrl} className="h-full w-full object-cover" muted playsInline />
              ) : (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                  {item.type === "VIDEO" ? (
                    <Play className="text-blue-700" size={18} />
                  ) : (
                    <ImageIcon className="text-blue-700" size={18} />
                  )}
                </div>
              </div>

              {item.title && (
                <p className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent p-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.title}
                </p>
              )}
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === "VIDEO" ? (
              <video
                src={active.imageUrl}
                controls
                autoPlay
                className="max-h-[85vh] w-full rounded-lg"
              />
            ) : (
              <div className="relative h-[80vh] w-full">
                <Image
                  src={active.imageUrl}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  className="rounded-lg object-contain"
                />
              </div>
            )}
            {active.title && (
              <p className="mt-3 text-center text-sm font-medium text-white/80">{active.title}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
