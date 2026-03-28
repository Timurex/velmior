import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import CartDrawer from '@/components/CartDrawer';
import Reveal from '@/components/Reveal';
import { publicReleases } from '@/data/teas';

export default function ReleasesPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100">
      <SiteHeader />
      <CartDrawer />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow">Releases</div>
            <h1 className="section-title mt-4">Current and archived Velmior releases</h1>
            <p className="mt-5 text-base leading-8 text-neutral-300">Every visible product here is a release with a batch, region and finite quantity. No category walls. No price sorting. Just the current line and the archive it leaves behind.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {publicReleases.map((release, index) => (
            <Reveal key={release.slug} delay={index * 70}>
              <article className="glass-panel grid overflow-hidden rounded-[2rem] shadow-soft md:grid-cols-[0.44fr_0.56fr]">
                <div className="relative min-h-[280px] border-b border-white/10 md:border-b-0 md:border-r">
                  <Image src={release.image} alt={release.releaseName} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="eyebrow">{release.batch}</div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">{release.status === 'soldout' ? 'Sold Out' : release.status === 'low' ? 'Almost Sold Out' : 'Limited'}</span>
                  </div>
                  <h2 className="mt-4 display-serif text-4xl leading-tight">{release.releaseName}</h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">{release.originCountry} · {release.region}</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-300">{release.shortNotes}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Harvest</div><div className="mt-2 text-sm">{release.harvest}</div></div>
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"><div className="eyebrow">Availability</div><div className="mt-2 text-sm">{release.status === 'soldout' ? 'This batch will not return' : `${release.remainingUnits} / ${release.totalUnits} left`}</div></div>
                  </div>
                  <Link href={`/release/${release.slug}`} className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black">View Release</Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
