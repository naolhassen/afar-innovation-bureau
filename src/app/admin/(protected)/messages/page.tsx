import { prisma } from "@/lib/prisma";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { markAsRead, deleteMessage } from "./actions";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-emerald-900">Contact Messages</h1>

      <div className="mt-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-5 ${
              m.isRead ? "border-zinc-200 bg-white" : "border-emerald-300 bg-emerald-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-zinc-800">
                  {m.name} <span className="text-zinc-400">&lt;{m.email}&gt;</span>
                </p>
                {m.phone && <p className="text-xs text-zinc-500">{m.phone}</p>}
                {m.subject && <p className="mt-1 text-sm font-medium text-emerald-800">{m.subject}</p>}
              </div>
              <div className="flex gap-2">
                {!m.isRead && (
                  <form
                    action={async () => {
                      "use server";
                      await markAsRead(m.id);
                    }}
                  >
                    <button type="submit" className="rounded-md p-2 text-emerald-700 hover:bg-emerald-100" title="Mark as read">
                      <MailOpen size={16} />
                    </button>
                  </form>
                )}
                <form
                  action={async () => {
                    "use server";
                    await deleteMessage(m.id);
                  }}
                >
                  <button type="submit" className="rounded-md p-2 text-red-600 hover:bg-red-50" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-zinc-700">{m.message}</p>
            <p className="mt-3 text-xs text-zinc-400">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <Mail size={16} /> No messages yet.
          </p>
        )}
      </div>
    </div>
  );
}
