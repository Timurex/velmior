'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';

export default function CartDrawer({ locale, t }) {
  const { items, subtotal, itemCount, updateQuantity, isOpen, setIsOpen } = useCart();
  const shipping = itemCount > 0 ? 30 : 0;
  const total = subtotal + shipping;

  return (
    <>
      {isOpen && <button aria-label="Close cart overlay" onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/60" />}
      <aside className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-neutral-950/95 p-6 backdrop-blur-xl transition duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">{t.cart}</div>
            <h3 className="mt-2 text-2xl font-semibold">{itemCount} {t.items}</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-white/30">×</button>
        </div>

        <div className="mt-8 max-h-[58vh] space-y-4 overflow-auto pr-1">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 p-6 text-sm leading-7 text-neutral-400">{t.emptyCart}</div>
          ) : (
            items.map((item) => (
              <div key={item.slug} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                    <Image src={item.image} alt={item.name[locale]} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.origin}</div>
                    <div className="mt-1 font-medium">{item.name[locale]}</div>
                    <div className="mt-2 text-sm text-neutral-400">₪{item.retailPrice} × {item.quantity}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="h-8 w-8 rounded-full border border-white/10 text-sm hover:border-white/30">−</button>
                      <div className="min-w-6 text-center text-sm">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="h-8 w-8 rounded-full border border-white/10 text-sm hover:border-white/30">+</button>
                    </div>
                  </div>
                  <div className="text-right font-medium">₪{item.lineTotal}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 p-5">
          <div className="flex justify-between text-sm text-neutral-400"><span>{t.subtotal}</span><span>₪{subtotal}</span></div>
          <div className="mt-2 flex justify-between text-sm text-neutral-400"><span>{t.shipping}</span><span>₪{shipping}</span></div>
          <div className="mt-4 flex justify-between text-lg font-semibold"><span>{t.total}</span><span>₪{total}</span></div>
          <div className="mt-5 grid gap-3">
            <Link href="/cart" onClick={() => setIsOpen(false)} className="rounded-full border border-white/10 px-6 py-3 text-center text-sm hover:border-white/30">{t.viewCart}</Link>
            <Link href="/checkout" onClick={() => setIsOpen(false)} className="rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-black transition hover:opacity-90">{t.goToCheckout}</Link>
          </div>
        </div>
      </aside>
    </>
  );
}
