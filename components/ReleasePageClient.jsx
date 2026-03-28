'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import CartDrawer from '@/components/CartDrawer';
import FlyToCartImage from '@/components/FlyToCartImage';
import ProductGallery from '@/components/ProductGallery';
import Reveal from '@/components/Reveal';
import { useCart } from '@/components/CartContext';

export default function ReleasePageClient({ release }) {
  const { addToCart, justAddedId } = useCart();
  const [sizeKey, setSizeKey] = useState(release.sizes[0].key);
  const [animation, setAnimation] = useState(null);
  const galleryWrapRef = useRef(null);
  const selectedSize = release.sizes.find((item) => item.key === sizeKey) || release.sizes[0];

  const onAdd = () => {
    const rect = galleryWrapRef.current?.getBoundingClientRect();
    addToCart(release, sizeKey);
    if (!rect) return;
    const targetLeft = window.innerWidth - 72;
    const targetTop = 32;
    setAnimation({ image: release.image, from: { left: rect.left, top: rect.top, width: rect.width, height: rect.height }, dx: targetLeft - rect.left, dy: targetTop - rect.top });
    setTimeout(() => setAnimation(null), 760);
  };

  const availability = release.status === 'soldout'
    ? 'This batch will not return'
    : release.status === 'low'
      ? `Low stock — ${release.remainingUnits} left`
      : `Only ${release.remainingUnits} left`;

  return (
    <div className="min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100">
      <FlyToCartImage animation={animation} />
      <SiteHeader />
      <CartDrawer />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <Link href="/releases" className="text-sm text-neutral-400 hover:text-white">← Back to releases</Link>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div ref={galleryWrapRef}>
              <ProductGallery images={release.gallery} title={release.releaseName} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <div className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300">{release.drop}</div>
              <div className="mt-4 text-sm text-neutral-500">{release.originCountry} · {release.region}</div>
              <h1 className="mt-4 display-serif text-5xl leading-tight">{release.releaseName}</h1>
              <p className="mt-2 text-lg text-neutral-300">{release.teaName}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Batch</div><div className="mt-2 text-sm font-medium">{release.batch}</div></div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Harvest</div><div className="mt-2 text-sm font-medium">{release.harvest}</div></div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Availability</div><div className="mt-2 text-sm font-medium">{availability}</div></div>
              </div>

              <p className="mt-6 text-lg leading-8 text-neutral-300">{release.story}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {Object.entries(release.tasting).map(([key, value]) => (
                  <div key={key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <div className="eyebrow capitalize">{key}</div>
                    <div className="mt-2 text-sm leading-7 text-neutral-300">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 glass-panel rounded-[2rem] p-6 shadow-soft">
                <div className="eyebrow">Purchase block</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {release.sizes.map((size) => (
                    <button key={size.key} onClick={() => setSizeKey(size.key)} className={`rounded-full border px-4 py-2 text-sm ${sizeKey === size.key ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30'}`}>{size.label}</button>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div><div className="eyebrow">Retail</div><div className="mt-2 text-4xl font-semibold">₪{selectedSize.price}</div></div>
                  <div><div className="eyebrow">Wholesale</div><div className="mt-2 text-3xl font-semibold text-neutral-200">₪{selectedSize.wholesalePrice || 'Private'}</div></div>
                </div>
                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-neutral-950 p-4 text-sm leading-7 text-neutral-300">Purchase limit: {release.purchaseLimit} per client during this release window.</div>
                <button disabled={release.status === 'soldout'} onClick={onAdd} className={`mt-6 rounded-full border px-6 py-3 text-sm transition ${release.status === 'soldout' ? 'cursor-not-allowed border-white/10 text-neutral-500' : justAddedId === `${release.slug}-${sizeKey}` ? 'border-white bg-white text-black' : 'border-white/15 hover:border-white/40 hover:bg-white/5'}`}>{release.status === 'soldout' ? 'Sold Out' : 'Add to cart'}</button>
              </div>
            </div>
          </Reveal>
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            ['Harvest', release.sections.harvest],
            ['Selection process', release.sections.selection],
            ['Packaging', release.sections.packaging],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 80}>
              <div className="glass-panel rounded-[2rem] p-6 shadow-soft">
                <div className="eyebrow">Story</div>
                <h2 className="mt-3 display-serif text-2xl">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-neutral-300">{text}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
    </div>
  );
}
