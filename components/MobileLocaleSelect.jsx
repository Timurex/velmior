'use client';

const locales = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'he', label: 'HE' },
];

export default function MobileLocaleSelect({ locale, setLocale, label = 'Language' }) {
  return (
    <label className="relative md:hidden">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(event) => setLocale(event.target.value)}
        className="glass-chip h-10 min-w-[64px] appearance-none px-3 py-2 pr-7 text-center text-[10px] font-medium uppercase tracking-[0.22em] outline-none"
      >
        {locales.map((item) => (
          <option key={item.value} value={item.value} className="bg-neutral-950 text-neutral-100">
            {item.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400">▾</span>
    </label>
  );
}
