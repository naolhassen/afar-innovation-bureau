export default function HeroBackground({
  videoSrc,
  posterSrc,
}: {
  videoSrc: string;
  posterSrc: string;
}) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050a18]">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a18]/65 via-[#0a1330]/45 to-[#1a0f38]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(74,129,211,0.18),_transparent_65%)]" />
      <div className="cg-grid-pattern absolute inset-0 opacity-25" />
    </div>
  );
}
