import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteDirectorate } from "./actions";

export default async function AdminDirectoratesPage() {
  const directorates = await prisma.directorate.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-900">Directorates</h1>
        <Link
          href="/admin/directorates/new"
          className="flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          <Plus size={16} /> New Directorate
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Name (EN)</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {directorates.map((d) => (
              <tr key={d.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 text-zinc-500">{d.order}</td>
                <td className="px-4 py-3 font-medium text-zinc-800">{d.nameEn}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/directorates/${d.id}/edit`} className="rounded-md p-2 text-emerald-700 hover:bg-emerald-50">
                      <Pencil size={16} />
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteDirectorate(d.id);
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
            {directorates.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-zinc-500">No directorates yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
