import PublicationForm from "@/components/admin/PublicationForm";
import { updatePublication } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publication = await prisma.publication.findUnique({ where: { id } });
  if (!publication) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">Edit Publication</h1>
      <div className="mt-6">
        <PublicationForm
          action={(formData) => updatePublication(id, formData)}
          publication={publication}
        />
      </div>
    </div>
  );
}
