import DirectorateForm from "@/components/admin/DirectorateForm";
import { createDirectorate } from "../actions";

export default function NewDirectoratePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">New Directorate</h1>
      <div className="mt-6">
        <DirectorateForm action={createDirectorate} />
      </div>
    </div>
  );
}
