'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import VelmiorLogo from '@/components/VelmiorLogo';

export default function CheckoutPageClient() {
  const { items, subtotal, itemCount } = useCart();
  const [shippingType, setShippingType] = useState('courier');
  const shippingMap = { courier: 30, pickup: 18, gift: 45 };
  const shippingPrice = itemCount > 0 ? shippingMap[shippingType] : 0;
  const total = subtotal + shippingPrice;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <VelmiorLogo />
          <Link href="/cart" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white/30">Back to cart</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <form className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <h1 className="text-4xl font-semibold">Checkout</h1>
            <div className="mt-8 grid gap-5">
              <input className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/30" placeholder="Full name" />
              <input className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/30" placeholder="Phone number" />
              <input className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/30" placeholder="Street, city, postal code" />
              <div>
                <div className="mb-3 text-sm text-neutral-300">Delivery type</div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['courier', 'Courier delivery'],
                    ['pickup', 'Pickup point'],
                    ['gift', 'Gift order'],
                  ].map(([key, label]) => (
                    <button key={key} type="button" onClick={() => setShippingType(key)} className={`rounded-2xl border px-4 py-3 text-sm ${shippingType === key ? 'border-white bg-white text-black' : 'border-white/10 bg-neutral-950 hover:border-white/30'}`}>{label}</button>
                  ))}
                </div>
              </div>
              <select className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/30">
                <option>Credit Card</option>
                <option>Bit</option>
                <option>PayPal</option>
              </select>
              <textarea rows={4} className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/30" placeholder="Order note (optional)" />
              <button type="button" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">Proceed to payment</button>
            </div>
          </form>
          <aside className="rounded-[2rem] border border-white/10 p-8">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-4">
              {items.length === 0 ? <div className="text-sm text-neutral-400">Your cart is empty.</div> : items.map((item) => (
                <div key={item.slug} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10"><Image src={item.image} alt={item.name.en} fill className="object-cover" /></div>
                  <div className="flex-1"><div className="font-medium">{item.name.en}</div><div className="mt-1 text-sm text-neutral-500">₪{item.retailPrice} × {item.quantity}</div></div>
                  <div className="font-medium">₪{item.lineTotal}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
              <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>₪{subtotal}</span></div>
              <div className="flex justify-between text-neutral-400"><span>Shipping</span><span>₪{shippingPrice}</span></div>
              <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>₪{total}</span></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
