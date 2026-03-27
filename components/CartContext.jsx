'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { teas } from '@/data/teas';

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

  const addToCart = (tea) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === tea.slug);
      if (existing) {
        return prev.map((item) => item.slug === tea.slug ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { slug: tea.slug, quantity: 1 }];
    });
    setJustAddedId(tea.slug);
    window.setTimeout(() => setJustAddedId(null), 900);
  };

  const updateQuantity = (slug, nextQuantity) => {
    if (nextQuantity <= 0) {
      setItems((prev) => prev.filter((item) => item.slug !== slug));
      return;
    }
    setItems((prev) => prev.map((item) => item.slug === slug ? { ...item, quantity: nextQuantity } : item));
  };

  const updateCheckout = (patch) => {
    setCheckout((prev) => ({ ...prev, ...patch }));
  };

  const clearCart = () => setItems([]);

  const detailedItems = useMemo(() => items
    .map((item) => {
      const tea = teas.find((entry) => entry.slug === item.slug);
      if (!tea) return null;
      return {
        ...tea,
        quantity: item.quantity,
        lineTotal: tea.retailPrice * item.quantity,
      };
    })
    .filter(Boolean), [items]);

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
