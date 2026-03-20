'use client';

import { CartProvider } from '@/components/CartContext';

export default function SiteProviders({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
