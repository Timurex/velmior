export default function VelmiorLogo({ small = false, compact = false }) {
  const tiny = small || compact;
  return (
    <div className="flex items-center gap-3">
      <div className={`relative overflow-hidden rounded-full border border-white/15 bg-white/5 ${tiny ? 'h-10 w-10' : 'h-12 w-12'}`}>
        <div className="absolute inset-2 rounded-full border border-white/20" />
        <div className="absolute inset-x-3 inset-y-1/2 h-px -translate-y-1/2 bg-white/35" />
        <div className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-white/20" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Velmior Tea Atelier</div>
        <div className="text-xl font-semibold tracking-[0.18em]">VELMIOR</div>
      </div>
    </div>
  );
}
