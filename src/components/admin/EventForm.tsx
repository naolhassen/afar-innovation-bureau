import TrilingualField from "./TrilingualField";
import FileUploadField from "./FileUploadField";
import type { Event } from "@/generated/prisma/client";

function toDateTimeLocal(date?: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function EventForm({
  action,
  event,
}: {
  action: (formData: FormData) => Promise<void>;
  event?: Event;
}) {
  return (
    <form action={action} className="space-y-5">
      <TrilingualField
        baseName="title"
        label="Title"
        required
        defaultValues={{ af: event?.titleAf, am: event?.titleAm, en: event?.titleEn }}
      />
      <TrilingualField
        baseName="description"
        label="Description"
        textarea
        required
        defaultValues={{
          af: event?.descriptionAf,
          am: event?.descriptionAm,
          en: event?.descriptionEn,
        }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            required
            defaultValue={toDateTimeLocal(event?.startDate)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            defaultValue={toDateTimeLocal(event?.endDate)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Location</label>
          <input
            name="location"
            defaultValue={event?.location ?? ""}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      <FileUploadField name="coverImage" label="Cover Image" defaultValue={event?.coverImage} />

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event?.published ?? true}
          className="h-4 w-4 rounded border-zinc-300 text-emerald-700"
        />
        Published
      </label>

      <button
        type="submit"
        className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Save
      </button>
    </form>
  );
}
