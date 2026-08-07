import SectorForm from "@/components/admin/SectorForm";
import { updateSector } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditSectorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = await prisma.sector.findUnique({ where: { id } });
  if (!sector) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">Edit Sector</h1>
      <div className="mt-6">
        <SectorForm action={(formData) => updateSector(id, formData)} sector={sector} />
      </div>
    </div>
  );
}
