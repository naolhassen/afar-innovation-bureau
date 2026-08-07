import TrilingualField from "./TrilingualField";
import FileUploadField from "./FileUploadField";
import type { Publication } from "@/generated/prisma/client";

export default function PublicationForm({
  action,
  publication,
}: {
  action: (formData: FormData) => Promise<void>;
  publication?: Publication;
}) {
  return (
    <form action={action} className="space-y-5">
      <TrilingualField
        baseName="title"
        label="Title"
        required
        defaultValues={{
          af: publication?.titleAf,
          am: publication?.titleAm,
          en: publication?.titleEn,
        }}
      />
      <TrilingualField
        baseName="description"
        label="Description"
        textarea
        defaultValues={{
          af: publication?.descriptionAf,
          am: publication?.descriptionAm,
          en: publication?.descriptionEn,
        }}
      />

      <FileUploadField name="fileUrl" label="Document File (PDF)" defaultValue={publication?.fileUrl} />
      <FileUploadField name="coverImage" label="Cover Image" defaultValue={publication?.coverImage} />

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={publication?.published ?? true}
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
