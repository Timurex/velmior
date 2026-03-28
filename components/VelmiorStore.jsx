'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { publicReleases } from '@/data/teas';
import { useCart } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';
import FlyToCartImage from '@/components/FlyToCartImage';
import Reveal from '@/components/Reveal';
import SiteHeader from '@/components/SiteHeader';

const storySlides = [
  {
    image: '/story/harvest.png',
    title: 'Harvest selected for release, not for shelf-filling',
    text: 'Velmior begins with volume sourcing, but only a small selection becomes a public release. Each batch must earn its place.',
  },
  {
    image: '/story/prep.png',
    title: 'Preparation protects aroma, structure and memory',
    text: 'The tea is evaluated not only as leaf, but as experience: how it opens, how it travels and how it feels in the cup.',
  },
  {
    image: '/story/pack.png',
    title: 'Packed like a rare object, not a commodity',
    text: 'Release labeling, batch numbers and controlled quantities turn each tea into an event rather than repeat stock.',
  },
];

export default function VelmiorStore() {
  const featured = useMemo(() => publicReleases.slice(0, 3), []);
  const current = featured[0];
  const { addToCart, justAddedId } = useCart();
  const [animation, setAnimation] = useState(null);
  const [slide, setSlide] = useState(0);
  const cardRefs = useRef({});

  useEffect(() => {
    const id = setInterval(() => setSlide((v) => (v + 1) % storySlides.length), 4800);
    return () => clearInterval(id);
  }, []);

  const animateAdd = (release) => {
    const card = cardRefs.current[release.slug];
    const imageNode = card?.querySelector('[data-release-image]');
    const rect = imageNode?.getBoundingClientRect();
    addToCart(release, release.sizes[0].key);
    if (!rect) return;
    const targetLeft = window.innerWidth - 72;
    const targetTop = 32;
    setAnimation({ image: release.image, from: { left: rect.left, top: rect.top, width: rect.width, height: rect.height }, dx: targetLeft - rect.left, dy: targetTop - rect.top });
    setTimeout(() => setAnimation(null), 760);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100">
      <FlyToCartImage animation={animation} />
      <SiteHeader />
      <CartDrawer />

      <main>
        <section className="hero-grid border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal>
              <div>
                <div className="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-neutral-300">VELMIOR · Limited Release Tea</div>
                <h1 className="mt-6 max-w-4xl display-serif text-5xl leading-[0.95] md:text-7xl">Tea released in batches, remembered like a rare find.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">Curated from China and Azerbaijan, Velmior is not a classic tea shop. It is a release platform built around batch numbers, scarcity, storytelling and private access.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/releases" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">Explore Releases</Link>
                  <Link href="/circle" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium hover:border-white/40 hover:bg-white/5">Join the Circle</Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="glass-panel rounded-[2rem] p-6 shadow-soft">
                <div className="eyebrow">Current focus</div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display-serif text-3xl">{current.drop}</h2>
                    <p className="mt-2 text-sm leading-7 text-neutral-300">{current.releaseName} · {current.batch} · {current.region}</p>
                  </div>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">{current.badge}</span>
                </div>
                <div className="mt-6 rounded-[1.5rem] border border-white/10 p-5 text-sm leading-7 text-neutral-300">We source in volume. We release in selection.</div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Explore Releases', 'Browse current and archived public batches'],
                    ['Join Velmior Circle', 'Request access to private and early releases'],
                    ['For Business', 'Wholesale supply, kg pricing and hospitality'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                      <div className="font-medium">{title}</div>
                      <p className="mt-2 text-xs leading-6 text-neutral-400">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="eyebrow">Current Releases</div>
                <h2 className="section-title mt-4">The current public drops</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-neutral-400">No traditional categories, no marketplace sorting. Each visible product is a release with a batch, a story and a finite quantity.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featured.map((release, index) => (
              <Reveal key={release.slug} delay={index * 80}>
                <article ref={(node) => { cardRefs.current[release.slug] = node; }} className="glass-panel rounded-[2rem] p-5 shadow-soft">
                  <div className="relative h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900">
                    <Image data-release-image src={release.image} alt={release.releaseName} fill className="object-cover" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-200">{release.drop}</div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">{release.batch}</div>
                      <h3 className="mt-2 display-serif text-3xl leading-tight">{release.releaseName}</h3>
                      <p className="mt-2 text-sm text-neutral-400">{release.originCountry} · {release.region}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs ${release.status === 'soldout' ? 'border border-white/10 text-neutral-400' : release.status === 'low' ? 'border border-amber-400/30 bg-amber-400/10 text-amber-200' : 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-200'}`}>{release.status === 'soldout' ? 'Sold Out' : release.status === 'low' ? 'Low Stock' : 'Limited'}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-neutral-300">{release.shortNotes}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Availability</div><div className="mt-2 text-sm font-medium">{release.status === 'soldout' ? 'This batch will not return' : `Remaining: ${release.remainingUnits} / ${release.totalUnits}`}</div></div>
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Price from</div><div className="mt-2 text-sm font-medium">₪{release.sizes[0].price}</div></div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/release/${release.slug}`} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">View Release</Link>
                    <button onClick={() => animateAdd(release)} disabled={release.status === 'soldout'} className={`rounded-full border px-5 py-3 text-sm ${release.status === 'soldout' ? 'cursor-not-allowed border-white/10 text-neutral-500' : justAddedId === `${release.slug}-${release.sizes[0].key}` ? 'border-white bg-white text-black' : 'border-white/15 hover:border-white/40 hover:bg-white/5'}`}>{release.status === 'soldout' ? 'Sold Out' : 'Add 50 g to cart'}</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <div>
                  <div className="eyebrow">Philosophy</div>
                  <h2 className="section-title mt-4">We source in volume. We release in selection.</h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-neutral-300">Scarcity on Velmior is not decoration. It is how the product is structured. Batches are finite, releases stay visible after sell-out, and the archive becomes part of the brand memory.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {['Explore Releases','Join Velmior Circle','For Business'].map((item) => <div key={item} className="rounded-[1.5rem] border border-white/10 p-4 text-sm text-neutral-300">{item}</div>)}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="eyebrow">How a release is made</div>
                <h2 className="section-title mt-4">From origin to final pouch</h2>
                <p className="mt-5 text-base leading-8 text-neutral-300">The same layout becomes darker and more mineral for China, warmer and more sunlit for Azerbaijan. The structure stays consistent, but the mood shifts with origin.</p>
                <div className="mt-6 flex gap-2">
                  {storySlides.map((_, idx) => <button key={idx} onClick={() => setSlide(idx)} className={`h-2.5 w-10 rounded-full ${slide===idx?'bg-white':'bg-white/20'}`} />)}
                </div>
              </div>
              <div className="glass-panel overflow-hidden rounded-[2rem] shadow-soft">
                <div className="relative h-[420px]">
                  {storySlides.map((item, idx) => (
                    <div key={item.title} className={`absolute inset-0 transition-all duration-700 ${slide===idx ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-[1.03]'}`}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                        <h3 className="display-serif text-3xl">{item.title}</h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-200">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:px-6 lg:grid-cols-3">
            {[
              ['Velmior Circle', 'Private access to limited and experimental batches, early access windows and invite-only drops.', '/circle'],
              ['Private Tasting Sessions', 'Connoisseur+ clients may receive invitations to quiet, small-format tasting events.', '/circle'],
              ['Wholesale', 'Stable supply, kg-based pricing and a practical B2B path without losing the Velmior visual identity.', '/wholesale'],
            ].map(([title, text, href]) => (
              <Reveal key={title}>
                <Link href={href} className="glass-panel block rounded-[2rem] p-6 shadow-soft hover:border-white/20">
                  <h3 className="display-serif text-3xl">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-neutral-300">{text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
