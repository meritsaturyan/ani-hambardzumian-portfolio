import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[480px] flex items-center">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2)_0,_transparent_50%),_radial-gradient(circle_at_bottom,_rgba(241,194,125,0.3)_0,_transparent_55%)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />
      <div className="container-page relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
        <div className="max-w-xl space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand.accent/70">
            Ani Hambardzumian Studios
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight">
            Professional photo & video
            <span className="block text-brand.primary">studio pavilions</span>
            for your next shoot.
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-md">
            Book fully equipped studio pavilions in central Yerevan for fashion,
            portrait, commercial or content shoots — with flexible hours and a
            premium experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pavilions" className="btn-primary text-sm">
              View Pavilions
            </Link>
            <Link href="/pavilions/studio-1-khorenatsi" className="btn-secondary text-sm">
              Book a Studio
            </Link>
          </div>
        </div>
        <div className="hidden md:block flex-1">
          <div className="relative w-full max-w-md ml-auto">
            <div className="aspect-[3/4] rounded-3xl bg-white/5 border border-white/10 shadow-soft overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-brand.primary/10 via-white/5 to-brand.accent/10 flex items-center justify-center text-xs text-white/60">
                Studio preview placeholder
              </div>
            </div>
            <div className="absolute -bottom-6 -left-8 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-xs shadow-soft">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                Pavilions
              </div>
              <div className="mt-1 text-sm font-medium">
                3 unique spaces • up to 20 guests
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
