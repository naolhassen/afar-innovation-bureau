import EventForm from "@/components/admin/EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">New Event</h1>
      <div className="mt-6">
        <EventForm action={createEvent} />
      </div>
    </div>
  );
}
