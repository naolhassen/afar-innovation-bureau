import DirectorateForm from "@/components/admin/DirectorateForm";
import { updateDirectorate } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditDirectoratePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const directorate = await prisma.directorate.findUnique({ where: { id } });
  if (!directorate) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">Edit Directorate</h1>
      <div className="mt-6">
        <DirectorateForm
          action={(formData) => updateDirectorate(id, formData)}
          directorate={directorate}
        />
      </div>
    </div>
  );
}
