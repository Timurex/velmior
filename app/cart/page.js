'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import VelmiorLogo from '@/components/VelmiorLogo';

const shippingOptions = [
  { key: 'courier', label: 'Courier delivery', text: 'Fast home delivery across Israel', price: 30 },
  { key: 'pickup', label: 'Pickup point', text: 'Lower cost, convenient collection point', price: 18 },
  { key: 'gift', label: 'Gift order', text: 'Priority packaging and gift-ready handling', price: 45 },
];

export default function CartPage() {
  const { items, subtotal, updateQuantity, itemCount, checkout, updateCheckout } = useCart();
  const shipping = itemCount > 0 ? (shippingOptions.find((option) => option.key === checkout.shippingType)?.price ?? 30) : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6">
          <VelmiorLogo compact />
          <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white/30">Continue shopping</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-neutral-500">
          <span className="rounded-full border border-white/10 px-3 py-1 text-neutral-200">1. Cart</span>
          <span>→</span>
          <span>2. Delivery</span>
          <span>→</span>
          <span>3. Review & payment</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <h1 className="display-serif text-4xl md:text-5xl">Your cart</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-400">Review quantities, choose delivery and continue when the order looks right.</p>
            <div className="mt-8 space-y-4">
              {items.length === 0 ? (
                <div className="rounded-[2rem] border border-white/10 p-8 text-neutral-400">Your cart is empty.</div>
              ) : items.map((item) => (
                <div key={item.slug} className="flex gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10"><Image src={item.image} alt={item.name.en} fill className="object-cover" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{item.name.en}</div>
                        <div className="mt-1 text-sm text-neutral-500">{item.origin}</div>
                      </div>
                      <div className="font-medium">₪{item.lineTotal}</div>
                    </div>
                    <div className="mt-3 text-sm text-neutral-400">₪{item.retailPrice} per 50 g pouch</div>
                    <div className="mt-4 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="h-9 w-9 rounded-full border border-white/10 text-sm hover:border-white/30">−</button>
                      <div className="min-w-8 text-center text-sm">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="h-9 w-9 rounded-full border border-white/10 text-sm hover:border-white/30">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-xs uppercase tracking-[0.26em] text-neutral-500">Delivery</div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {shippingOptions.map((option) => {
                  const active = checkout.shippingType === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => updateCheckout({ shippingType: option.key })}
                      className={`rounded-[1.5rem] border p-4 text-left transition ${active ? 'border-white bg-white text-black' : 'border-white/10 bg-neutral-950 hover:border-white/30'}`}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className={`mt-2 text-xs leading-6 ${active ? 'text-black/70' : 'text-neutral-400'}`}>{option.text}</div>
                      <div className="mt-3 text-sm font-semibold">₪{option.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[2rem] border border-white/10 p-8">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-neutral-400"><span>Items</span><span>{itemCount}</span></div>
              <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>₪{subtotal}</span></div>
              <div className="flex justify-between text-neutral-400"><span>Shipping</span><span>₪{shipping}</span></div>
              <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>₪{total}</span></div>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-neutral-400">
              Delivery choice is saved and carried into checkout automatically.
            </div>
            <Link href="/checkout" className={`mt-6 block rounded-full px-6 py-3 text-center text-sm font-medium ${items.length === 0 ? 'pointer-events-none border border-white/10 text-neutral-500' : 'bg-white text-black'}`}>
              Continue to checkout
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}
