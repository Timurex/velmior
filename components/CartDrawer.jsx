'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useCart } from '@/components/CartContext';

export default function CartDrawer() {
  const { items, subtotal, itemCount, updateQuantity, isOpen, setIsOpen } = useCart();
  const shipping = itemCount > 0 ? 30 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  return (
    <>
      {isOpen && <button aria-label="Close cart overlay" onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/65" />}
      <aside className={`fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-full flex-col border-l border-white/10 bg-neutral-950/95 backdrop-blur-xl transition duration-300 sm:max-w-md ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="border-b border-white/10 px-4 pb-4 pt-5 md:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="eyebrow">Cart</div>
              <h3 className="mt-2 text-2xl font-semibold">{itemCount} items</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-white/30">×</button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 md:px-6">
          <div className="space-y-4 pb-6">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-white/10 p-6 text-sm leading-7 text-neutral-400">Your cart is empty. Explore releases and add a batch to continue.</div>
            ) : items.map((item) => (
              <div key={`${item.slug}-${item.sizeKey}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                    <Image src={item.image} alt={item.releaseName} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.batch}</div>
                    <div className="mt-1 font-medium">{item.releaseName}</div>
                    <div className="mt-2 text-sm text-neutral-400">₪{item.unitPrice} · {item.sizeLabel}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.slug, item.sizeKey, item.quantity - 1)} className="h-8 w-8 rounded-full border border-white/10 text-sm hover:border-white/30">−</button>
                      <div className="min-w-6 text-center text-sm">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.slug, item.sizeKey, item.quantity + 1)} className="h-8 w-8 rounded-full border border-white/10 text-sm hover:border-white/30">+</button>
                    </div>
                  </div>
                  <div className="text-right font-medium">₪{item.lineTotal}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-neutral-950/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-6">
          <div className="rounded-3xl border border-white/10 p-5">
            <div className="flex justify-between text-sm text-neutral-400"><span>Subtotal</span><span>₪{subtotal}</span></div>
            <div className="mt-2 flex justify-between text-sm text-neutral-400"><span>Shipping</span><span>₪{shipping}</span></div>
            <div className="mt-4 flex justify-between text-lg font-semibold"><span>Total</span><span>₪{total}</span></div>
            <div className="mt-5 grid gap-3">
              <Link href="/cart" onClick={() => setIsOpen(false)} className="rounded-full border border-white/10 px-6 py-3 text-center text-sm hover:border-white/30">View cart</Link>
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-black transition hover:opacity-90">Checkout</Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
