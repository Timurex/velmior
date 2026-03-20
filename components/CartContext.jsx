'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { teas } from '@/data/teas';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('velmior-cart');
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem('velmior-cart', JSON.stringify(items));
  }, [items, isReady]);

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
