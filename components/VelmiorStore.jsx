'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { teas } from '@/data/teas';
import { useCart } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';
import VelmiorLogo from '@/components/VelmiorLogo';
import FlyToCartImage from '@/components/FlyToCartImage';
import Reveal from '@/components/Reveal';
import MobileLocaleSelect from '@/components/MobileLocaleSelect';

const translations = {
  en: {
    dir: 'ltr',
    heroPill: 'Velmior Tea Atelier · Premium Loose Leaf Tea',
    heroTitle: 'Tea chosen like a fine release, offered like a quiet luxury ritual.',
    heroText:
      'Velmior curates small-batch teas for Israel with a cleaner premium experience: clear origin, richer product storytelling, elegant packaging and a storefront that feels calm, refined and gift-worthy.',
    heroStats: [
      ['Small-batch curation', 'Focused releases instead of a crowded catalog'],
      ['Detailed product pages', 'Origin, brewing, packaging and gallery on every tea'],
      ['Retail + wholesale', 'For private buyers, gifts and boutique partners'],
    ],
    shopNow: 'Explore the collection',
    forPartners: 'Wholesale & partnerships',
    menu: 'Menu',
    mobileLang: 'Language',
    nav: [
      ['collection', 'Collection'],
      ['story', 'Our process'],
      ['journal', 'Why Velmior'],
      ['partners', 'Wholesale'],
      ['contact', 'Contact'],
    ],
    storyLabel: 'From origin to final pouch',
    sliderTitle: 'How a Velmior tea comes to life',
    sliderText:
      'Every release is selected for character, consistency and presentation, then translated into a product page that helps customers understand what they are buying before they ever brew it.',
    sliderSlides: [
      {
        title: 'Leaf with a clear place behind it',
        text: 'We prioritize teas that can be presented with real context: region, style, environment and flavor identity.',
      },
      {
        title: 'Prepared to protect aroma and structure',
        text: 'The goal is not just attractive packaging but a tea that still performs beautifully in the cup after transport and storage.',
      },
      {
        title: 'Packed with premium shelf presence',
        text: 'Velmior is designed to feel collectible, presentable and easy to gift without looking mass-market.',
      },
    ],
    collection: 'Collection',
    collectionTitle: 'A focused line of premium teas',
    collectionText:
      'Rather than overwhelming the customer, Velmior starts with a tight collection: strong visual presentation, clear tasting profile and enough information to buy with confidence.',
    retail: 'Retail',
    wholesale: 'Wholesale',
    pouch: '50 g pouch',
    wholesaleHint: 'per unit for wholesale orders',
    add: 'Add to cart',
    added: 'Added',
    details: 'Discover the full tea story',
    cardPrompt: 'Tasting profile, brewing, origin and packaging details inside.',
    cart: 'Cart',
    items: 'items',
    emptyCart: 'Your cart is empty. Add a tea and it will appear here.',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    viewCart: 'View cart',
    goToCheckout: 'Checkout',
    whyLabel: 'Why the site feels different',
    whyCards: [
      [
        'Less “online tea shelf”, more boutique brand',
        'The structure, spacing and imagery are designed to make the store feel closer to perfume, specialty wine or luxury stationery than a generic tea catalog.',
      ],
      [
        'A calmer purchase journey',
        'Clear product pages, a persistent cart and softer visual hierarchy reduce friction and help customers focus on taste, origin and fit.',
      ],
      [
        'Better for gifts and premium positioning',
        'This presentation supports higher price acceptance and makes the teas feel easier to buy as a gift or a more deliberate personal ritual.',
      ],
    ],
    partnerTitle: 'For cafés, boutiques and premium retail partners',
    partnerText:
      'Use the cooperation form to request wholesale pricing, sample discussions or a conversation about stocking Velmior in your café, design store, concept shop or hospitality space.',
    partnerButton: 'Send partnership request',
    partnerFields: ['Business / Contact name', 'Email address', 'Tell us about your store, audience or format'],
    contactTitle: 'Questions before ordering?',
    contactText:
      'Reach out for delivery questions, gifting, product recommendations or wholesale interest. The goal is to make the buying experience feel personal and easy.',
    contactButton: 'Send message',
    contactFields: ['Your name', 'Your email', 'Your message'],
  },
  ru: {
    dir: 'ltr',
    heroPill: 'Velmior Tea Atelier · Премиальный листовой чай',
    heroTitle: 'Чай, выбранный как редкий релиз и поданный как тихий премиальный ритуал.',
    heroText:
      'Velmior собирает маленькие партии чая для Израиля и показывает их через более чистый и дорогой формат: понятное происхождение, сильные страницы товара, аккуратная упаковка и витрина, которая ощущается спокойно и премиально.',
    heroStats: [
      ['Маленькие партии', 'Сфокусированные релизы вместо перегруженного каталога'],
      ['Подробные страницы товаров', 'Происхождение, заваривание, упаковка и галерея для каждого чая'],
      ['Розница и опт', 'Для частных клиентов, подарков и бутиковых партнёров'],
    ],
    shopNow: 'Смотреть коллекцию',
    forPartners: 'Опт и сотрудничество',
    menu: 'Меню',
    mobileLang: 'Язык',
    nav: [
      ['collection', 'Каталог'],
      ['story', 'Производство'],
      ['journal', 'Почему Velmior'],
      ['partners', 'Опт'],
      ['contact', 'Контакты'],
    ],
    storyLabel: 'От происхождения до финальной упаковки',
    sliderTitle: 'Как рождается чай Velmior',
    sliderText:
      'Каждый релиз отбирается по характеру, стабильности и подаче, а затем превращается в понятный продукт с фото и текстом, чтобы клиент осознанно понимал, что именно он покупает.',
    sliderSlides: [
      {
        title: 'Лист с понятным происхождением',
        text: 'Мы делаем акцент на чаях, про которые можно честно рассказать: регион, стиль, среда выращивания и вкусовой характер.',
      },
      {
        title: 'Подготовка для сохранения аромата',
        text: 'Задача не только в красивой упаковке, но и в том, чтобы чай хорошо раскрывался после доставки и хранения.',
      },
      {
        title: 'Упаковка с ощущением премиального релиза',
        text: 'Velmior задуман так, чтобы чай выглядел подарочно, коллекционно и не напоминал массовый товар.',
      },
    ],
    collection: 'Каталог',
    collectionTitle: 'Собранная коллекция премиальных чаёв',
    collectionText:
      'Вместо перегруженной витрины Velmior стартует с короткой сильной коллекцией: выразительный визуал, понятный вкус и достаточно информации для уверенной покупки.',
    retail: 'Розница',
    wholesale: 'Опт',
    pouch: 'пакет 50 г',
    wholesaleHint: 'за единицу при оптовом заказе',
    add: 'В корзину',
    added: 'Добавлено',
    details: 'Смотреть полное описание чая',
    cardPrompt: 'Внутри: вкус, происхождение, заваривание и упаковка.',
    cart: 'Корзина',
    items: 'товаров',
    emptyCart: 'Корзина пока пуста. Добавьте чай, и он появится здесь.',
    subtotal: 'Подытог',
    shipping: 'Доставка',
    total: 'Итого',
    viewCart: 'Смотреть корзину',
    goToCheckout: 'Оформить заказ',
    whyLabel: 'Почему сайт ощущается иначе',
    whyCards: [
      [
        'Меньше “полки интернет-магазина”, больше бутикового бренда',
        'Структура, интервалы и визуальный язык делают сайт ближе к нишевой парфюмерии, specialty wine или luxury stationery, чем к обычному каталогу чая.',
      ],
      [
        'Более спокойный путь к покупке',
        'Подробные страницы товара, сохранённая корзина и мягкая визуальная иерархия снижают трение и помогают сосредоточиться на вкусе и происхождении.',
      ],
      [
        'Лучше для подарков и премиального позиционирования',
        'Такая подача помогает оправдывать более высокую цену и делает чай более уместным как подарок или личный ритуал.',
      ],
    ],
    partnerTitle: 'Для кофеен, бутиков и премиальных партнёров',
    partnerText:
      'Через форму можно запросить оптовые условия, обсудить образцы или поговорить о размещении Velmior в кофейне, бутике, концепт-сторе или гостиничном пространстве.',
    partnerButton: 'Отправить заявку',
    partnerFields: ['Название бизнеса / имя', 'Email', 'Расскажите о магазине, аудитории или формате'],
    contactTitle: 'Есть вопросы перед заказом?',
    contactText:
      'Напишите нам по поводу доставки, подарков, выбора чая или оптового сотрудничества. Покупка должна ощущаться личной и простой.',
    contactButton: 'Отправить сообщение',
    contactFields: ['Ваше имя', 'Ваш email', 'Ваше сообщение'],
  },
  he: {
    dir: 'rtl',
    heroPill: 'Velmior Tea Atelier · תה עלים פרימיום',
    heroTitle: 'תה שנבחר כמו מהדורה נדירה ומוגש כמו טקס יוקרתי ושקט.',
    heroText:
      'Velmior אוצר אצוות קטנות של תה לישראל ומציג אותן בחוויית קנייה נקייה ויוקרתית יותר: מקור ברור, דפי מוצר עשירים, אריזה אלגנטית וחזית מותג רגועה ומעודנת.',
    heroStats: [
      ['אצוות קטנות', 'מהדורות ממוקדות במקום קטלוג עמוס'],
      ['דפי מוצר מפורטים', 'מקור, חליטה, אריזה וגלריה לכל תה'],
      ['קמעונאות וסיטונאות', 'ללקוחות פרטיים, מתנות ושותפים בוטיקיים'],
    ],
    shopNow: 'לצפייה בקולקציה',
    forPartners: 'סיטונאות ושיתופי פעולה',
    menu: 'תפריט',
    mobileLang: 'שפה',
    nav: [
      ['collection', 'קטלוג'],
      ['story', 'התהליך שלנו'],
      ['journal', 'למה Velmior'],
      ['partners', 'סיטונאות'],
      ['contact', 'יצירת קשר'],
    ],
    storyLabel: 'מהמקור ועד לשקית הסופית',
    sliderTitle: 'איך תה של Velmior מקבל צורה',
    sliderText:
      'כל מהדורה נבחרת לפי אופי, יציבות ואופן ההצגה שלה, ואז הופכת למוצר ברור עם צילום ותוכן כדי שהלקוח יבין היטב מה הוא קונה.',
    sliderSlides: [
      {
        title: 'עלה עם מקום ברור מאחוריו',
        text: 'אנחנו מעדיפים תה שאפשר להציג עם הקשר אמיתי: אזור, סגנון, סביבת גידול וזהות טעם.',
      },
      {
        title: 'מוכן לשמירת הארומה והמבנה',
        text: 'המטרה היא לא רק אריזה יפה, אלא תה שנפתח היטב גם אחרי משלוח ואחסון.',
      },
      {
        title: 'אריזה עם נוכחות של מהדורת פרימיום',
        text: 'Velmior נבנה כך שהתה ירגיש ראוי למתנה, לאספנות ולמדף יוקרתי מבלי להיראות המוני.',
      },
    ],
    collection: 'קטלוג',
    collectionTitle: 'קולקציה ממוקדת של תה פרימיום',
    collectionText:
      'במקום להעמיס על הלקוח, Velmior מתחיל בקולקציה קצרה וחזקה: הצגה ויזואלית ברורה, פרופיל טעם מובן ומספיק מידע לקנייה בטוחה.',
    retail: 'קמעונאי',
    wholesale: 'סיטונאי',
    pouch: 'שקית 50 גרם',
    wholesaleHint: 'ליחידה בהזמנה סיטונאית',
    add: 'הוסף לעגלה',
    added: 'נוסף',
    details: 'לכל הסיפור של התה',
    cardPrompt: 'בפנים: טעם, מקור, חליטה ופרטי האריזה.',
    cart: 'עגלה',
    items: 'פריטים',
    emptyCart: 'העגלה ריקה כרגע. הוסף תה והוא יופיע כאן.',
    subtotal: 'סכום ביניים',
    shipping: 'משלוח',
    total: 'סה״כ',
    viewCart: 'לצפייה בעגלה',
    goToCheckout: 'לתשלום',
    whyLabel: 'למה האתר מרגיש שונה',
    whyCards: [
      [
        'פחות “מדף אינטרנטי”, יותר מותג בוטיק',
        'המבנה, הריווח והדימויים גורמים לחנות להרגיש קרובה יותר לבושם נישתי, יין בוטיק או מוצרי נייר יוקרתיים מאשר לקטלוג תה גנרי.',
      ],
      [
        'מסע קנייה רגוע יותר',
        'דפי מוצר ברורים, עגלה שנשמרת והיררכיה ויזואלית רכה מפחיתים חיכוך ועוזרים להתמקד בטעם, במקור ובהתאמה.',
      ],
      [
        'טוב יותר למתנות ולמיצוב פרימיום',
        'ההצגה הזו תומכת בקבלת מחיר גבוהה יותר והופכת את התה למתאים יותר כמתנה או כריטואל אישי מכוון.',
      ],
    ],
    partnerTitle: 'לבתי קפה, בוטיקים ושותפי פרימיום',
    partnerText:
      'השתמשו בטופס לשאלות על מחירי סיטונאות, דגימות או שיחה על שילוב Velmior בבית קפה, בחנות עיצוב, בחנות מתנות או במרחב אירוח יוקרתי.',
    partnerButton: 'שלח בקשה',
    partnerFields: ['שם העסק / איש קשר', 'כתובת אימייל', 'ספרו לנו על סוג העסק או הקהל שלכם'],
    contactTitle: 'יש שאלות לפני ההזמנה?',
    contactText:
      'פנו אלינו לגבי משלוח, מתנות, בחירת תה או שיתוף פעולה סיטונאי. הרכישה אמורה להרגיש אישית, ברורה ונעימה.',
    contactButton: 'שלח הודעה',
    contactFields: ['השם שלך', 'האימייל שלך', 'ההודעה שלך'],
  },
};

const localeOrder = ['en', 'ru', 'he'];

function AutoStorySlider({ t }) {
  const slides = [
    { image: '/story/harvest.png', ...t.sliderSlides[0] },
    { image: '/story/prep.png', ...t.sliderSlides[1] },
    { image: '/story/pack.png', ...t.sliderSlides[2] },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section id="story" className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">{t.storyLabel}</div>
              <h2 className="section-title mt-4">{t.sliderTitle}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-neutral-400">{t.sliderText}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-soft">
            <div className="relative h-[440px] md:h-[520px]">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slide.title}
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${slideIndex === index ? 'opacity-100 scale-100 translate-x-0' : slideIndex < index ? 'pointer-events-none opacity-0 scale-[1.04] -translate-x-4' : 'pointer-events-none opacity-0 scale-[1.02] translate-x-4'}`}
                >
                  <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-3xl">
                      <h3 className="display-serif text-3xl md:text-5xl">{slide.title}</h3>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-200">{slide.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.title}
                onClick={() => setIndex(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
                className={`h-2.5 rounded-full transition-all ${slideIndex === index ? 'w-10 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/65'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIndex((index - 1 + slides.length) % slides.length)} className="glass-chip px-4 py-2 text-sm">←</button>
            <button onClick={() => setIndex((index + 1) % slides.length)} className="glass-chip px-4 py-2 text-sm">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileMenu({ open, onClose, openCart, locale, setLocale, t, itemCount }) {
  return (
    <>
      {open && <button aria-label="Close menu overlay" onClick={onClose} className="fixed inset-0 z-40 bg-black/60 md:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm border-r border-white/10 bg-neutral-950/95 p-6 backdrop-blur-xl transition duration-300 md:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <VelmiorLogo compact />
          <button onClick={onClose} className="glass-chip px-4 py-2 text-sm">×</button>
        </div>
        <div className="mt-8 flex rounded-full border border-white/10 p-1">
          {localeOrder.map((code) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              className={`flex-1 rounded-full px-3 py-2 text-xs uppercase tracking-[0.22em] ${locale === code ? 'bg-white text-black' : 'text-neutral-300'}`}
            >
              {code}
            </button>
          ))}
        </div>
        <nav className="mt-10 grid gap-3">
          {t.nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={onClose} className="rounded-[1.25rem] border border-white/10 px-5 py-4 text-lg text-neutral-200 transition hover:border-white/30 hover:bg-white/[0.03]">
              {label}
            </a>
          ))}
          <button onClick={() => { onClose(); openCart(); }} className="rounded-[1.25rem] border border-white/10 px-5 py-4 text-left text-lg text-neutral-200">
            {t.cart} · {itemCount}
          </button>
        </nav>
      </aside>
    </>
  );
}

function StoreShell() {
  const [locale, setLocale] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const { addToCart, itemCount, justAddedId, setIsOpen } = useCart();
  const t = translations[locale];
  const cartButtonRef = useRef(null);
  const [animation, setAnimation] = useState(null);

  const nav = useMemo(() => t.nav, [t]);

  const animateAdd = (event, tea) => {
    const card = event.currentTarget.closest('[data-tea-card]');
    const imageNode = card?.querySelector('[data-tea-image]');
    const imgRect = imageNode?.getBoundingClientRect();
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
    <div dir={t.dir} className="min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100 selection:bg-neutral-200 selection:text-neutral-950">
      <FlyToCartImage animation={animation} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} openCart={() => setIsOpen(true)} locale={locale} setLocale={setLocale} t={t} itemCount={itemCount} />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:gap-4 md:px-6">
          <VelmiorLogo compact />
          <nav className="hidden min-w-0 items-center gap-7 md:flex">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-sm text-neutral-300 transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setMenuOpen(true)} className="glass-chip flex min-w-[82px] items-center justify-center px-4 py-2 text-center text-sm md:hidden">{t.menu}</button>
            <MobileLocaleSelect locale={locale} setLocale={setLocale} label={t.mobileLang} />
            <div className="hidden rounded-full border border-white/10 p-1 md:flex">
              {localeOrder.map((code) => (
                <button
                  key={code}
                  onClick={() => setLocale(code)}
                  className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] ${locale === code ? 'bg-white text-black' : 'text-neutral-300'}`}
                >
                  {code}
                </button>
              ))}
            </div>
            <button
              ref={cartButtonRef}
              onClick={() => setIsOpen(true)}
              className={`rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/40 hover:bg-white/5 ${justAddedId ? 'cart-badge-pop' : ''}`}
            >
              {t.cart}
              <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-black">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-grid border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-[1fr_0.92fr] md:px-6 md:py-28">
            <Reveal>
              <div>
                <div className="glass-chip inline-flex px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-neutral-200">{t.heroPill}</div>
                <h1 className="mt-7 max-w-4xl display-serif text-5xl leading-[1.02] md:text-7xl">{t.heroTitle}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">{t.heroText}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#collection" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">{t.shopNow}</a>
                  <a href="#partners" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-white/40 hover:bg-white/5">{t.forPartners}</a>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {t.heroStats.map(([title, text], idx) => (
                    <Reveal key={title} delay={120 + idx * 90}>
                      <div className="glass-panel rounded-[1.5rem] p-5">
                        <div className="text-sm font-medium text-white">{title}</div>
                        <div className="mt-2 text-sm leading-6 text-neutral-400">{text}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                {teas.map((tea, index) => (
                  <div key={tea.slug} className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-soft ${index === 2 ? 'sm:col-span-2' : ''}`}>
                    <div className={`relative ${index === 2 ? 'h-56' : 'h-72'}`}>
                      <Image src={tea.gallery[0]} alt={tea.name[locale]} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="text-sm text-neutral-300">{tea.origin}</div>
                        <div className="mt-2 display-serif text-2xl">{tea.name[locale]}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <AutoStorySlider t={t} />

        <section id="collection" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="eyebrow">{t.collection}</div>
                <h2 className="section-title mt-4">{t.collectionTitle}</h2>
              </div>
              <div className="max-w-xl text-sm leading-7 text-neutral-400">{t.collectionText}</div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {teas.map((tea, index) => {
              const isJustAdded = justAddedId === tea.slug;
              return (
                <Reveal key={tea.id} delay={index * 80}>
                  <article data-tea-card className={`group rounded-[2rem] border border-white/10 bg-neutral-900 p-6 transition hover:-translate-y-1 hover:border-white/20 shadow-soft ${isJustAdded ? 'added-bump' : ''}`}>
                    <div data-tea-image className="relative h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950">
                      <Image src={tea.gallery[0]} alt={tea.name[locale]} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300">{tea.badge}</span>
                      <span className="text-sm text-neutral-500">{tea.origin}</span>
                    </div>
                    <h3 className="mt-6 display-serif text-3xl leading-tight">{tea.name[locale]}</h3>
                    <p className="mt-4 text-base leading-7 text-neutral-200">{tea.short[locale]}</p>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">{t.cardPrompt}</p>
                    <div className="mt-8 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">{t.retail}</div>
                        <div className="text-3xl font-semibold">₪{tea.retailPrice}</div>
                        <div className="text-xs text-neutral-500">{t.pouch}</div>
                        <div className="mt-3 text-xs uppercase tracking-[0.22em] text-neutral-500">{t.wholesale}</div>
                        <div className="text-xl font-semibold text-neutral-200">₪{tea.wholesalePrice}</div>
                        <div className="text-xs text-neutral-500">{t.wholesaleHint}</div>
                      </div>
                      <div className="grid gap-3">
                        <button onClick={(event) => animateAdd(event, tea)} className={`rounded-full border px-5 py-2 text-sm transition ${isJustAdded ? 'border-white bg-white text-black' : 'border-white/15 hover:border-white/40 hover:bg-white/5'}`}>{isJustAdded ? t.added : t.add}</button>
                        <Link href={`/product/${tea.slug}`} className="rounded-full bg-white px-5 py-2 text-center text-sm font-medium text-black transition hover:opacity-90">{t.details}</Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="journal" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
            <Reveal>
              <div className="eyebrow">{t.whyLabel}</div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {t.whyCards.map(([title, text], index) => (
                  <Reveal key={title} delay={index * 80}>
                    <div className="glass-panel rounded-[2rem] p-7">
                      <div className="display-serif text-2xl">{title}</div>
                      <p className="mt-4 text-sm leading-7 text-neutral-300">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="partners" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div>
              <div className="eyebrow">{t.forPartners}</div>
              <h2 className="section-title mt-4">{t.partnerTitle}</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">{t.partnerText}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form className="glass-panel rounded-[2rem] p-8 shadow-soft">
              <div className="grid gap-5">
                <input className="field-input" placeholder={t.partnerFields[0]} />
                <input className="field-input" placeholder={t.partnerFields[1]} />
                <textarea rows={5} className="field-input" placeholder={t.partnerFields[2]} />
              </div>
              <button type="button" className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">{t.partnerButton}</button>
            </form>
          </Reveal>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1fr_1fr] md:px-6">
          <Reveal>
            <div>
              <div className="eyebrow">Contact</div>
              <h2 className="section-title mt-4">{t.contactTitle}</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">{t.contactText}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form className="rounded-[2rem] border border-white/10 p-8 shadow-soft">
              <div className="grid gap-5">
                <input className="field-input" placeholder={t.contactFields[0]} />
                <input className="field-input" placeholder={t.contactFields[1]} />
                <textarea rows={5} className="field-input" placeholder={t.contactFields[2]} />
              </div>
              <button type="button" className="mt-6 rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-white/40 hover:bg-white/5">{t.contactButton}</button>
            </form>
          </Reveal>
        </section>
      </main>
      <CartDrawer locale={locale} t={t} />
    </div>
  );
}

export default function VelmiorStore() {
  return <StoreShell />;
}
