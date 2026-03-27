import './globals.css';
import SiteProviders from '@/components/SiteProviders';

export const metadata = {
  metadataBase: new URL('https://www.velmior.store'),
  title: {
    default: 'Velmior Tea Atelier',
    template: '%s | Velmior Tea Atelier',
  },
  description: 'Premium loose leaf tea for Israel. Discover curated small-batch teas, detailed product pages and a calm premium checkout experience.',
  keywords: ['Velmior', 'tea israel', 'premium tea', 'loose leaf tea', 'wuyi tea', 'lapsang souchong'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Velmior Tea Atelier',
    description: 'Premium loose leaf tea for Israel. Curated small-batch teas with a refined online storefront.',
    url: 'https://www.velmior.store',
    siteName: 'Velmior Tea Atelier',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Velmior Tea Atelier',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velmior Tea Atelier',
    description: 'Premium loose leaf tea for Israel. Curated small-batch teas with a refined online storefront.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
