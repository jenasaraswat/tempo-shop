import { createContext, useContext, useMemo, useState } from 'react';
import { PROMO_CODES, FREE_SHIPPING_FROM, SHIPPING_FEE } from '../data/products.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { slug, name, price, size, qty }
  const [promo, setPromo] = useState(null);

  const addItem = (product, size, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug && i.size === size);
      if (existing) return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug: product.slug, name: product.name, price: product.price, size, qty }];
    });
  };

  const updateQty = (slug, size, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))
    );

  const removeItem = (slug, size) => updateQty(slug, size, 0);

  const applyPromo = (code) => {
    const key = code.trim().toUpperCase();
    if (PROMO_CODES[key]) { setPromo({ code: key, rate: PROMO_CODES[key] }); return true; }
    return false;
  };

  const clear = () => { setItems([]); setPromo(null); };

  const totals = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    const discount = promo ? Math.round(subtotal * promo.rate * 100) / 100 : 0;
    const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
    return { count, subtotal, discount, shipping, total: subtotal - discount + shipping };
  }, [items, promo]);

  return (
    <CartContext.Provider value={{ items, promo, totals, addItem, updateQty, removeItem, applyPromo, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
