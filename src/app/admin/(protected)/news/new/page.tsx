import NewsForm from "@/components/admin/NewsForm";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-emerald-900">New Article</h1>
      <div className="mt-6">
        <NewsForm action={createNews} />
      </div>
    </div>
  );
}
