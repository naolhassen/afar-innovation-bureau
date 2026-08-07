import type { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  FileText,
  Images,
  Building2,
  Layers,
  HelpCircle,
  Settings,
  Mail,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/publications", label: "Publications", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/sectors", label: "Sectors", icon: Layers },
  { href: "/admin/directorates", label: "Directorates", icon: Building2 },
  { href: "/admin/faq", label: "FAQs", icon: HelpCircle },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col bg-emerald-950 text-emerald-100 sm:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image src="/logo.jpg" alt="Afar ITDB" fill sizes="36px" className="object-cover" />
          </div>
          <span className="text-sm font-semibold text-white">Afar ITDB Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
          className="px-3 py-4"
        >
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-emerald-200 hover:bg-white/10"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
