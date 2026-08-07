import NewsForm from "@/components/admin/NewsForm";
import { updateNews } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">Edit Article</h1>
      <div className="mt-6">
        <NewsForm action={(formData) => updateNews(id, formData)} news={news} />
      </div>
    </div>
  );
}
