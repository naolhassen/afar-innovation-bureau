import TrilingualField from "./TrilingualField";
import type { Sector } from "@/generated/prisma/client";

export default function SectorForm({
  action,
  sector,
}: {
  action: (formData: FormData) => Promise<void>;
  sector?: Sector;
}) {
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Display Order</label>
        <input
          type="number"
          name="order"
          defaultValue={sector?.order ?? 0}
          className="w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
      </div>

      <TrilingualField
        baseName="name"
        label="Service Name"
        required
        defaultValues={{ af: sector?.nameAf, am: sector?.nameAm, en: sector?.nameEn }}
      />
      <TrilingualField
        baseName="headTitle"
        label="Deputy Head Title"
        defaultValues={{ af: sector?.headTitleAf, am: sector?.headTitleAm, en: sector?.headTitleEn }}
      />
      <TrilingualField
        baseName="description"
        label="Description"
        textarea
        defaultValues={{
          af: sector?.descriptionAf,
          am: sector?.descriptionAm,
          en: sector?.descriptionEn,
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
