import SectorForm from "@/components/admin/SectorForm";
import { createSector } from "../actions";

export default function NewSectorPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">New Service</h1>
      <div className="mt-6">
        <SectorForm action={createSector} />
      </div>
    </div>
  );
}
