import './globals.css';
import SiteProviders from '@/components/SiteProviders';

export const metadata = {
  metadataBase: new URL('https://www.velmior.store'),
  title: {
    default: 'VELMIOR — Limited Release Tea',
    template: '%s | VELMIOR',
  },
  description: 'VELMIOR is a premium limited release tea platform. Explore curated drops from China and Azerbaijan, join Velmior Circle and discover private access releases.',
  keywords: ['Velmior', 'limited release tea', 'tea drops', 'premium tea israel', 'Velmior Circle', 'Azerbaijan tea', 'China tea'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'VELMIOR — Limited Release Tea',
    description: 'A release-based premium tea platform built around drops, batches and private access.',
    url: 'https://www.velmior.store',
    siteName: 'VELMIOR',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'VELMIOR Limited Release Tea' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELMIOR — Limited Release Tea',
    description: 'A release-based premium tea platform built around drops, batches and private access.',
    images: ['/og-image.svg'],
  },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
