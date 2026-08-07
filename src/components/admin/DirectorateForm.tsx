import TrilingualField from "./TrilingualField";
import type { Directorate } from "@/generated/prisma/client";

export default function DirectorateForm({
  action,
  directorate,
}: {
  action: (formData: FormData) => Promise<void>;
  directorate?: Directorate;
}) {
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Display Order</label>
        <input
          type="number"
          name="order"
          defaultValue={directorate?.order ?? 0}
          className="w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
      </div>

      <TrilingualField
        baseName="name"
        label="Directorate Name"
        required
        defaultValues={{ af: directorate?.nameAf, am: directorate?.nameAm, en: directorate?.nameEn }}
      />
      <TrilingualField
        baseName="description"
        label="Description"
        textarea
        defaultValues={{
          af: directorate?.descriptionAf,
          am: directorate?.descriptionAm,
          en: directorate?.descriptionEn,
        }}
      />

      <button
        type="submit"
        className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Save
      </button>
    </form>
  );
}
