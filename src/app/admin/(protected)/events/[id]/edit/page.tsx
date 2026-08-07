import EventForm from "@/components/admin/EventForm";
import { updateEvent } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">Edit Event</h1>
      <div className="mt-6">
        <EventForm action={(formData) => updateEvent(id, formData)} event={event} />
      </div>
    </div>
  );
}
