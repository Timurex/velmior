import SiteHeader from '@/components/SiteHeader';
import CartDrawer from '@/components/CartDrawer';
import Reveal from '@/components/Reveal';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader />
      <CartDrawer />
      <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <Reveal>
          <div className="eyebrow">About Velmior</div>
          <h1 className="section-title mt-4">Not a tea shop. A curated release platform.</h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-neutral-300">
            <p>Velmior is built around a simple idea: tea should not always feel like an endless shelf. Some lots deserve to be introduced as releases — chosen with care, numbered, limited and remembered.</p>
            <p>The visual language remains premium, dark and restrained. China is expressed through stone, smoke and contrast. Azerbaijan is expressed through warmth, greenery and softer light. The structure stays consistent; the mood shifts with origin.</p>
            <p>As the platform grows, Velmior Circle will add access logic, tiers, private releases and eventually account-based release management without turning the brand into a gamified marketplace.</p>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
