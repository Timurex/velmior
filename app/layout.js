import './globals.css';
import SiteProviders from '@/components/SiteProviders';

export const metadata = {
  title: 'Velmior Tea Atelier',
  description: 'Premium loose leaf tea store for Israel',
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
