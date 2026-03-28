import SiteHeader from '@/components/SiteHeader';
import CartDrawer from '@/components/CartDrawer';
import Reveal from '@/components/Reveal';

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader />
      <CartDrawer />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <div className="max-w-4xl">
            <div className="eyebrow">For Business</div>
            <h1 className="section-title mt-4">Wholesale supply for cafés, boutiques and hospitality</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-300">This page is intentionally more practical than the retail side. It focuses on stability, kg-based pricing, packaging options and how Velmior fits into premium retail and service environments.</p>
          </div>
        </Reveal>
        <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="glass-panel rounded-[2rem] p-6 shadow-soft">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 p-4"><div className="eyebrow">Supply</div><div className="mt-2 text-sm text-neutral-300">Stable lots, scheduled restocks and release-based curation when appropriate.</div></div>
                <div className="rounded-[1.5rem] border border-white/10 p-4"><div className="eyebrow">Pricing</div><div className="mt-2 text-sm text-neutral-300">Kg-based pricing, sample requests and partner margin discussions.</div></div>
                <div className="rounded-[1.5rem] border border-white/10 p-4"><div className="eyebrow">Formats</div><div className="mt-2 text-sm text-neutral-300">Retail pouches, hospitality packs and custom packing conversations.</div></div>
                <div className="rounded-[1.5rem] border border-white/10 p-4"><div className="eyebrow">Use cases</div><div className="mt-2 text-sm text-neutral-300">Cafés, gift stores, premium offices, hotels and concept retail.</div></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form className="glass-panel rounded-[2rem] p-6 shadow-soft">
              <div className="eyebrow">Partner enquiry</div>
              <h2 className="mt-3 display-serif text-3xl">Wholesale contact form</h2>
              <div className="mt-6 grid gap-4">
                <input className="field-input" placeholder="Business name" />
                <input className="field-input" placeholder="Email address" />
                <input className="field-input" placeholder="Volume interest (kg / month)" />
                <textarea className="field-input" rows="5" placeholder="Tell us about your store, audience, service format or what teas you are interested in" />
                <button type="button" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">Send wholesale request</button>
              </div>
            </form>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
