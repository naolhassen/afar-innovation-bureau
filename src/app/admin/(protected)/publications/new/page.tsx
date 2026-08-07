import PublicationForm from "@/components/admin/PublicationForm";
import { createPublication } from "../actions";

export default function NewPublicationPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">New Publication</h1>
      <div className="mt-6">
        <PublicationForm action={createPublication} />
      </div>
    </div>
  );
}
