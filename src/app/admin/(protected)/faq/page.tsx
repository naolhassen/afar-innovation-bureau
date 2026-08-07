import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteFaq } from "./actions";

export default async function AdminFaqPage() {
  const faqs = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-900">FAQs</h1>
        <Link
          href="/admin/faq/new"
          className="flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          <Plus size={16} /> New FAQ
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Question (EN)</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 text-zinc-500">{f.order}</td>
                <td className="px-4 py-3 font-medium text-zinc-800">{f.questionEn}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/faq/${f.id}/edit`} className="rounded-md p-2 text-emerald-700 hover:bg-emerald-50">
                      <Pencil size={16} />
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteFaq(f.id);
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
            {faqs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-zinc-500">No FAQs yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
