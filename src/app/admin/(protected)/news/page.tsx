import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteNews } from "./actions";

export default async function AdminNewsListPage() {
  const news = await prisma.news.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-900">News</h1>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          <Plus size={16} /> New Article
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3">Title (EN)</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-medium text-zinc-800">{n.titleEn}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      n.published ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {n.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {new Date(n.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/news/${n.id}/edit`}
                      className="rounded-md p-2 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Pencil size={16} />
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteNews(n.id);
                      }}
                    >
                      <button type="submit" className="rounded-md p-2 text-red-600 hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-zinc-500">
                  No news articles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
