const langs = [
  { code: "Af", label: "Afar" },
  { code: "Am", label: "Amharic" },
  { code: "En", label: "English" },
];

export default function TrilingualField({
  baseName,
  label,
  defaultValues,
  textarea = false,
  required = false,
}: {
  baseName: string;
  label: string;
  defaultValues?: { af?: string | null; am?: string | null; en?: string | null };
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <fieldset className="rounded-md border border-zinc-200 p-4">
      <legend className="px-1 text-sm font-semibold text-emerald-900">{label}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {langs.map(({ code, label: langLabel }) => {
          const name = `${baseName}${code}`;
          const defaultValue =
            code === "Af"
              ? defaultValues?.af ?? ""
              : code === "Am"
              ? defaultValues?.am ?? ""
              : defaultValues?.en ?? "";
          return (
            <div key={code}>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                {langLabel}
              </label>
              {textarea ? (
                <textarea
                  name={name}
                  defaultValue={defaultValue}
                  required={required}
                  rows={4}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                />
              ) : (
                <input
                  name={name}
                  defaultValue={defaultValue}
                  required={required}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                />
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
