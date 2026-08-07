import TrilingualField from "./TrilingualField";
import FileUploadField from "./FileUploadField";
import type { News } from "@/generated/prisma/client";

export default function NewsForm({
  action,
  news,
}: {
  action: (formData: FormData) => Promise<void>;
  news?: News;
}) {
  return (
    <form action={action} className="space-y-5">
      <TrilingualField
        baseName="title"
        label="Title"
        required
        defaultValues={{ af: news?.titleAf, am: news?.titleAm, en: news?.titleEn }}
      />
      <TrilingualField
        baseName="excerpt"
        label="Excerpt (short summary)"
        textarea
        defaultValues={{ af: news?.excerptAf, am: news?.excerptAm, en: news?.excerptEn }}
      />
      <TrilingualField
        baseName="content"
        label="Content"
        textarea
        required
        defaultValues={{ af: news?.contentAf, am: news?.contentAm, en: news?.contentEn }}
      />

      <FileUploadField name="coverImage" label="Cover Image" defaultValue={news?.coverImage} />

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={news?.published ?? true}
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
