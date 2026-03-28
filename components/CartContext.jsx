'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { releases } from '@/data/teas';

const CartContext = createContext(null);

const defaultCheckout = {
  shippingType: 'courier',
  paymentMethod: 'Credit Card',
  note: '',
  fullName: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [checkout, setCheckout] = useState(defaultCheckout);
  const [isOpen, setIsOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem('velmior-cart');
      const rawCheckout = window.localStorage.getItem('velmior-checkout');
      if (rawCart) setItems(JSON.parse(rawCart));
      if (rawCheckout) setCheckout({ ...defaultCheckout, ...JSON.parse(rawCheckout) });
    } catch {
      setItems([]);
      setCheckout(defaultCheckout);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem('velmior-cart', JSON.stringify(items));
  }, [items, isReady]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem('velmior-checkout', JSON.stringify(checkout));
  }, [checkout, isReady]);

  const addToCart = (tea, sizeKey = tea.sizes?.[0]?.key || '50g') => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === tea.slug && item.sizeKey === sizeKey);
      if (existing) {
        return prev.map((item) => item.slug === tea.slug && item.sizeKey === sizeKey ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { slug: tea.slug, sizeKey, quantity: 1 }];
    });
    setJustAddedId(`${tea.slug}-${sizeKey}`);
    window.setTimeout(() => setJustAddedId(null), 900);
  };

  const updateQuantity = (slug, sizeKey, nextQuantity) => {
    if (nextQuantity <= 0) {
      setItems((prev) => prev.filter((item) => !(item.slug === slug && item.sizeKey === sizeKey)));
      return;
    }
    setItems((prev) => prev.map((item) => item.slug === slug && item.sizeKey === sizeKey ? { ...item, quantity: nextQuantity } : item));
  };

  const updateCheckout = (patch) => setCheckout((prev) => ({ ...prev, ...patch }));
  const clearCart = () => setItems([]);

  const detailedItems = useMemo(() => items.map((item) => {
    const tea = releases.find((entry) => entry.slug === item.slug);
    if (!tea) return null;
    const size = tea.sizes.find((entry) => entry.key === item.sizeKey) || tea.sizes[0];
    return {
      ...tea,
      quantity: item.quantity,
      sizeKey: size.key,
      sizeLabel: size.label,
      unitPrice: size.price,
      lineTotal: size.price * item.quantity,
    };
  }).filter(Boolean), [items]);

  const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);

  return (
    <CartContext.Provider value={{
      items: detailedItems,
      itemCount,
      subtotal,
      addToCart,
      updateQuantity,
      clearCart,
      isOpen,
      setIsOpen,
      justAddedId,
      isReady,
      checkout,
      updateCheckout,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used within CartProvider');
  return value;
}
