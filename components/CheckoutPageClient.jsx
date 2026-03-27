'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import VelmiorLogo from '@/components/VelmiorLogo';

const shippingMap = { courier: 30, pickup: 18, gift: 45 };
const shippingLabel = {
  courier: 'Courier delivery',
  pickup: 'Pickup point',
  gift: 'Gift order',
};

export default function CheckoutPageClient() {
  const { items, subtotal, itemCount, checkout, updateCheckout } = useCart();
  const shippingPrice = itemCount > 0 ? shippingMap[checkout.shippingType] ?? 30 : 0;
  const total = subtotal + shippingPrice;
  const canSubmit = itemCount > 0 && checkout.fullName && checkout.phone && checkout.address && checkout.city;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6">
          <VelmiorLogo compact />
          <Link href="/cart" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white/30">Back to cart</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-neutral-500">
          <span>1. Cart</span>
          <span>→</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-neutral-200">2. Delivery</span>
          <span>→</span>
          <span>3. Review & payment</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <form className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h1 className="display-serif text-4xl md:text-5xl">Checkout</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-400">Delivery preference, customer details and payment method are remembered while the customer moves through the store.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-neutral-300">Full name</span>
                <input value={checkout.fullName} onChange={(e) => updateCheckout({ fullName: e.target.value })} className="field-input" placeholder="Full name" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Phone number</span>
                <input value={checkout.phone} onChange={(e) => updateCheckout({ phone: e.target.value })} className="field-input" placeholder="Phone number" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">City</span>
                <input value={checkout.city} onChange={(e) => updateCheckout({ city: e.target.value })} className="field-input" placeholder="City" />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-neutral-300">Street address</span>
                <input value={checkout.address} onChange={(e) => updateCheckout({ address: e.target.value })} className="field-input" placeholder="Street, building, apartment" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Postal code</span>
                <input value={checkout.postalCode} onChange={(e) => updateCheckout({ postalCode: e.target.value })} className="field-input" placeholder="Postal code" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Payment method</span>
                <select value={checkout.paymentMethod} onChange={(e) => updateCheckout({ paymentMethod: e.target.value })} className="field-input">
                  <option>Credit Card</option>
                  <option>Bit</option>
                  <option>PayPal</option>
                </select>
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm text-neutral-300">Order note</span>
                <textarea value={checkout.note} onChange={(e) => updateCheckout({ note: e.target.value })} rows={4} className="field-input" placeholder="Gift note, delivery note or special request" />
              </label>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-neutral-950 p-4 text-sm leading-7 text-neutral-300">
              Selected delivery: <span className="font-medium text-white">{shippingLabel[checkout.shippingType] || 'Courier delivery'}</span>
            </div>
            <button type="button" className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-medium transition ${canSubmit ? 'bg-white text-black hover:opacity-90' : 'border border-white/10 text-neutral-500'}`}>
              {canSubmit ? 'Proceed to payment' : 'Complete delivery details to continue'}
            </button>
          </form>
          <aside className="rounded-[2rem] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-4">
              {items.length === 0 ? <div className="text-sm text-neutral-400">Your cart is empty.</div> : items.map((item) => (
                <div key={item.slug} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10"><Image src={item.image} alt={item.name.en} fill className="object-cover" /></div>
                  <div className="min-w-0 flex-1"><div className="font-medium">{item.name.en}</div><div className="mt-1 text-sm text-neutral-500">₪{item.retailPrice} × {item.quantity}</div></div>
                  <div className="font-medium">₪{item.lineTotal}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
              <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>₪{subtotal}</span></div>
              <div className="flex justify-between text-neutral-400"><span>Shipping</span><span>₪{shippingPrice}</span></div>
              <div className="flex justify-between text-neutral-400"><span>Payment</span><span>{checkout.paymentMethod}</span></div>
              <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>₪{total}</span></div>
            </div>
            <Link href="/cart" className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-2 text-sm hover:border-white/30">Edit cart</Link>
          </aside>
        </div>
      </main>
    </div>
  );
}
