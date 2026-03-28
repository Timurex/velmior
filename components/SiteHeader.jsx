'use client';

import Link from 'next/link';
import { useState } from 'react';
import VelmiorLogo from '@/components/VelmiorLogo';
import MobileLocaleSelect from '@/components/MobileLocaleSelect';
import { useCart } from '@/components/CartContext';

const links = [
  ['/', 'Home'],
  ['/releases', 'Releases'],
  ['/circle', 'Circle'],
  ['/wholesale', 'For Business'],
  ['/about', 'About'],
];

export default function SiteHeader() {
  const { itemCount, setIsOpen, justAddedId } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState('en');

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="hidden items-center justify-between gap-6 md:flex">
          <VelmiorLogo compact />
          <nav className="flex items-center gap-5 text-sm text-neutral-300">
            {links.map(([href, label]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 p-1">
              {['en','ru','he'].map((code) => <button key={code} onClick={() => setLocale(code)} className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] ${locale === code ? 'bg-white text-black' : 'text-neutral-300'}`}>{code}</button>)}
            </div>
            <button onClick={() => setIsOpen(true)} className={`rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/40 hover:bg-white/5 ${justAddedId ? 'cart-badge-pop' : ''}`}>Cart <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-black">{itemCount}</span></button>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between gap-3">
            <VelmiorLogo compact />
            <button onClick={() => setIsOpen(true)} className={`shrink-0 rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/40 hover:bg-white/5 ${justAddedId ? 'cart-badge-pop' : ''}`}>Cart <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-black">{itemCount}</span></button>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
            <button onClick={() => setMenuOpen((v) => !v)} className="glass-chip flex h-10 items-center justify-center px-4 text-center text-sm">Menu</button>
            <MobileLocaleSelect locale={locale} setLocale={setLocale} label="Language" />
          </div>
          {menuOpen && (
            <div className="mt-3 rounded-[1.5rem] border border-white/10 bg-neutral-950/95 p-3">
              {links.map(([href, label]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-neutral-200 hover:bg-white/[0.05]">{label}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
