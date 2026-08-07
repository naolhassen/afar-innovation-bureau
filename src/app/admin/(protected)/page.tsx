import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Newspaper,
  CalendarDays,
  FileText,
  Images,
  Mail,
} from "lucide-react";

export default async function AdminDashboard() {
  const [newsCount, eventsCount, publicationsCount, galleryCount, unreadMessages] =
    await Promise.all([
      prisma.news.count(),
      prisma.event.count(),
      prisma.publication.count(),
      prisma.galleryItem.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

  const cards = [
    { label: "News", value: newsCount, href: "/admin/news", icon: Newspaper },
    { label: "Events", value: eventsCount, href: "/admin/events", icon: CalendarDays },
    { label: "Publications", value: publicationsCount, href: "/admin/publications", icon: FileText },
    { label: "Gallery Items", value: galleryCount, href: "/admin/gallery", icon: Images },
    { label: "Unread Messages", value: unreadMessages, href: "/admin/messages", icon: Mail },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-emerald-900">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">Afar ITDB content overview</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-900">{c.value}</p>
                <p className="text-sm text-zinc-500">{c.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
