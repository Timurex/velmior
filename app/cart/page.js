'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import VelmiorLogo from '@/components/VelmiorLogo';

export default function CartPage() {
  const { items, subtotal, updateQuantity, itemCount } = useCart();
  const shipping = itemCount > 0 ? 30 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <VelmiorLogo />
          <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white/30">Continue shopping</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <h1 className="text-4xl font-semibold">Your cart</h1>
            <div className="mt-8 space-y-4">
              {items.length === 0 ? (
                <div className="rounded-[2rem] border border-white/10 p-8 text-neutral-400">Your cart is empty.</div>
              ) : items.map((item) => (
                <div key={item.slug} className="flex gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10"><Image src={item.image} alt={item.name.en} fill className="object-cover" /></div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name.en}</div>
                    <div className="mt-1 text-sm text-neutral-500">₪{item.retailPrice}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="h-8 w-8 rounded-full border border-white/10">−</button>
                      <div className="min-w-6 text-center">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="h-8 w-8 rounded-full border border-white/10">+</button>
                    </div>
                  </div>
                  <div className="font-medium">₪{item.lineTotal}</div>
                </div>
              ))}
            </div>
          </section>
          <aside className="h-fit rounded-[2rem] border border-white/10 p-8">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>₪{subtotal}</span></div>
              <div className="flex justify-between text-neutral-400"><span>Shipping</span><span>₪{shipping}</span></div>
              <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>₪{total}</span></div>
            </div>
            <Link href="/checkout" className="mt-6 block rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-black">Proceed to checkout</Link>
          </aside>
        </div>
      </main>
    </div>
  );
}
