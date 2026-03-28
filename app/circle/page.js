import SiteHeader from '@/components/SiteHeader';
import CartDrawer from '@/components/CartDrawer';
import Reveal from '@/components/Reveal';

export default function CirclePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader />
      <CartDrawer />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <div className="max-w-4xl">
            <div className="eyebrow">Velmior Circle</div>
            <h1 className="section-title mt-4">Private access to limited and experimental releases</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-300">Circle is not a standard sign-up page. It is the entry point for clients who want early access, private batches and invite-only drops before they become public.</p>
          </div>
        </Reveal>
        <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="glass-panel rounded-[2rem] p-6 shadow-soft">
              <div className="eyebrow">Benefits</div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-300">
                <p><strong className="text-white">Member</strong> — base access to the Circle list and release notices.</p>
                <p><strong className="text-white">Collector</strong> — early access windows and priority email notifications.</p>
                <p><strong className="text-white">Reserve</strong> — access to hidden and tier-based private releases.</p>
                <p><strong className="text-white">Inner Circle</strong> — invite-only drops and private tasting session invitations.</p>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-neutral-950 p-4 text-sm leading-7 text-neutral-300">No gamified points. No visible XP. Status is treated like private club access, not a loyalty app.</div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form className="glass-panel rounded-[2rem] p-6 shadow-soft">
              <div className="eyebrow">Request Access</div>
              <h2 className="mt-3 display-serif text-3xl">Apply to Velmior Circle</h2>
              <div className="mt-6 grid gap-4">
                <input className="field-input" placeholder="Full name" />
                <input className="field-input" placeholder="Email address" />
                <input className="field-input" placeholder="City / country" />
                <textarea className="field-input" rows="5" placeholder="Tell us what kinds of teas or releases you want access to" />
                <button type="button" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">Request Access</button>
              </div>
            </form>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
