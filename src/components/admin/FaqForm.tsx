import TrilingualField from "./TrilingualField";
import type { FaqItem } from "@/generated/prisma/client";

export default function FaqForm({
  action,
  faq,
}: {
  action: (formData: FormData) => Promise<void>;
  faq?: FaqItem;
}) {
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">Display Order</label>
        <input
          type="number"
          name="order"
          defaultValue={faq?.order ?? 0}
          className="w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
        />
      </div>

      <TrilingualField
        baseName="question"
        label="Question"
        required
        defaultValues={{ af: faq?.questionAf, am: faq?.questionAm, en: faq?.questionEn }}
      />
      <TrilingualField
        baseName="answer"
        label="Answer"
        textarea
        required
        defaultValues={{ af: faq?.answerAf, am: faq?.answerAm, en: faq?.answerEn }}
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
