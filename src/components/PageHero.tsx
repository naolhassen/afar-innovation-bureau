export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-float rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-blue-100">{subtitle}</p>}
      </div>
    </section>
  );
}
