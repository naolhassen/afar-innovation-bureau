export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="cg-dark relative isolate overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#050a18]/95 via-[#0a1330]/85 to-[#1a0f38]/90" />
      <div className="cg-grid-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-float rounded-full bg-blue-500/25 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 animate-float-slow rounded-full bg-purple-500/25 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-40">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{subtitle}</p>}
      </div>
    </section>
  );
}
