import FaqForm from "@/components/admin/FaqForm";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">New FAQ</h1>
      <div className="mt-6">
        <FaqForm action={createFaq} />
      </div>
    </div>
  );
}
