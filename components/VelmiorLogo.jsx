export default function VelmiorLogo({ small = false, compact = false }) {
  const tiny = small || compact;
  return (
    <div className={`flex items-center ${tiny ? 'gap-2.5' : 'gap-3'}`}>
      <div className={`relative overflow-hidden rounded-full border border-white/15 bg-white/5 ${tiny ? 'h-10 w-10' : 'h-12 w-12'}`}>
        <div className="absolute inset-2 rounded-full border border-white/20" />
        <div className="absolute inset-x-3 inset-y-1/2 h-px -translate-y-1/2 bg-white/35" />
        <div className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-white/20" />
      </div>
      <div className="min-w-0">
        <div className={`uppercase tracking-[0.35em] text-neutral-400 ${tiny ? 'hidden sm:block text-[10px]' : 'text-[10px]'}`}>Velmior Tea Atelier</div>
        <div className={`${tiny ? 'text-lg tracking-[0.14em]' : 'text-xl tracking-[0.18em]'} font-semibold whitespace-nowrap`}>VELMIOR</div>
      </div>
    </div>
  );
}
