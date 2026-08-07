import FaqForm from "@/components/admin/FaqForm";
import { updateFaq } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faqItem.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">Edit FAQ</h1>
      <div className="mt-6">
        <FaqForm action={(formData) => updateFaq(id, formData)} faq={faq} />
      </div>
    </div>
  );
}
