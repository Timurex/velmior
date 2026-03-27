'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useCart } from '@/components/CartContext';
import VelmiorLogo from '@/components/VelmiorLogo';
import CartDrawer from '@/components/CartDrawer';
import FlyToCartImage from '@/components/FlyToCartImage';
import ProductGallery from '@/components/ProductGallery';
import Reveal from '@/components/Reveal';
import MobileLocaleSelect from '@/components/MobileLocaleSelect';

const labels = {
  en: {
    back: 'Back to store',
    retail: 'Retail',
    wholesale: 'Wholesale',
    add: 'Add to cart',
    added: 'Added',
    sections: ['How it is grown', 'How to brew it', 'How it is packed'],
    cart: 'Cart',
    items: 'items',
    emptyCart: 'Your cart is empty. Add a tea and it will appear here.',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    viewCart: 'View cart',
    goToCheckout: 'Checkout',
    gallery: 'Product gallery',
    recommendation: 'Selected to feel giftable, collectible and deeply satisfying to brew.',
    mobileLang: 'Language',
  },
  ru: {
    back: 'Назад в магазин',
    retail: 'Розница',
    wholesale: 'Опт',
    add: 'В корзину',
    added: 'Добавлено',
    sections: ['Как выращивается', 'Как заваривать', 'Как упаковывается'],
    cart: 'Корзина',
    items: 'товаров',
    emptyCart: 'Корзина пока пуста. Добавьте чай, и он появится здесь.',
    subtotal: 'Подытог',
    shipping: 'Доставка',
    total: 'Итого',
    viewCart: 'Смотреть корзину',
    goToCheckout: 'Оформить заказ',
    gallery: 'Галерея товара',
    recommendation: 'Отобран так, чтобы ощущаться подарочно, коллекционно и действительно красиво раскрываться в чашке.',
    mobileLang: 'Язык',
  },
  he: {
    back: 'חזרה לחנות',
    retail: 'קמעונאי',
    wholesale: 'סיטונאי',
    add: 'הוסף לעגלה',
    added: 'נוסף',
    sections: ['איך מגדלים', 'איך חולטים', 'איך אורזים'],
    cart: 'עגלה',
    items: 'פריטים',
    emptyCart: 'העגלה ריקה כרגע. הוסף תה והוא יופיע כאן.',
    subtotal: 'סכום ביניים',
    shipping: 'משלוח',
    total: 'סה״כ',
    viewCart: 'לצפייה בעגלה',
    goToCheckout: 'לתשלום',
    gallery: 'גלריית מוצר',
    recommendation: 'נבחר כדי להרגיש ראוי למתנה, לאספנות ולחליטה מספקת באמת.',
    mobileLang: 'שפה',
  },
};

const localeOrder = ['en', 'ru', 'he'];

export default function ProductPageClient({ tea }) {
  const [locale, setLocale] = useState('en');
  const { addToCart, justAddedId, setIsOpen, itemCount } = useCart();
  const [animation, setAnimation] = useState(null);
  const cartButtonRef = useRef(null);
  const galleryWrapRef = useRef(null);
  const t = labels[locale];
  const d = tea.details[locale];

  const animateAdd = () => {
    const imgRect = galleryWrapRef.current?.getBoundingClientRect();
    const cartRect = cartButtonRef.current?.getBoundingClientRect();
    addToCart(tea);
    if (!imgRect || !cartRect) return;
    const start = { left: imgRect.left, top: imgRect.top, width: imgRect.width, height: imgRect.height };
    const targetLeft = cartRect.left + cartRect.width / 2 - imgRect.width / 2;
    const targetTop = cartRect.top + cartRect.height / 2 - imgRect.height / 2;
    setAnimation({ image: tea.image, from: start, dx: targetLeft - start.left, dy: targetTop - start.top });
    window.setTimeout(() => setAnimation(null), 760);
  };

  return (
    <div dir={locale === 'he' ? 'rtl' : 'ltr'} className="min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100">
      <FlyToCartImage animation={animation} />
      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 md:gap-4 md:px-6">
          <VelmiorLogo compact />
          <div className="flex items-center gap-2 md:gap-3">
            <MobileLocaleSelect locale={locale} setLocale={setLocale} label={t.mobileLang} />
            <div className="hidden rounded-full border border-white/10 p-1 md:flex">
              {localeOrder.map((code) => (
                <button key={code} onClick={() => setLocale(code)} className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] ${locale === code ? 'bg-white text-black' : 'text-neutral-300'}`}>{code}</button>
              ))}
            </div>
            <button ref={cartButtonRef} onClick={() => setIsOpen(true)} className={`rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/40 hover:bg-white/5 ${justAddedId ? 'cart-badge-pop' : ''}`}>{t.cart} <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-black">{itemCount}</span></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <Link href="/" className="text-sm text-neutral-400 hover:text-white">← {t.back}</Link>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div ref={galleryWrapRef}>
              <ProductGallery images={tea.gallery} title={tea.name[locale]} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <div className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300">{tea.badge}</div>
              <div className="mt-4 text-sm text-neutral-500">{tea.origin}</div>
              <h1 className="mt-4 display-serif text-5xl leading-tight">{tea.name[locale]}</h1>
              <p className="mt-6 text-lg leading-8 text-neutral-300">{d.description}</p>
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-neutral-300">{t.recommendation}</div>
              <div className="mt-8 glass-panel rounded-[2rem] p-6 shadow-soft">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><div className="text-xs uppercase tracking-[0.25em] text-neutral-500">{t.retail}</div><div className="mt-2 text-4xl font-semibold">₪{tea.retailPrice}</div></div>
                  <div><div className="text-xs uppercase tracking-[0.25em] text-neutral-500">{t.wholesale}</div><div className="mt-2 text-3xl font-semibold text-neutral-200">₪{tea.wholesalePrice}</div></div>
                </div>
                <button onClick={animateAdd} className={`mt-6 rounded-full border px-6 py-3 text-sm transition ${justAddedId === tea.slug ? 'border-white bg-white text-black' : 'border-white/15 hover:border-white/40 hover:bg-white/5'}`}>{justAddedId === tea.slug ? t.added : t.add}</button>
              </div>
            </div>
          </Reveal>
        </div>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {[d.growing, d.preparation, d.packaging].map((text, index) => (
            <Reveal key={index} delay={index * 90}>
              <div className="glass-panel rounded-[2rem] p-6 shadow-soft">
                <div className="eyebrow">{t.gallery}</div>
                <h2 className="mt-3 display-serif text-2xl">{t.sections[index]}</h2>
                <p className="mt-4 text-sm leading-7 text-neutral-300">{text}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
      <CartDrawer locale={locale} t={t} />
    </div>
  );
}
