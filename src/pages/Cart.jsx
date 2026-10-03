import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { FREE_SHIPPING_FROM } from '../data/products.js';
import { money } from '../utils.js';

export default function Cart() {
  const { items, totals, promo, updateQty, removeItem, applyPromo } = useCart();
  const [code, setCode] = useState('');
  const [promoMsg, setPromoMsg] = useState('');
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="empty" data-testid="empty-cart">
        <h1 className="page-title">Your bag is empty</h1>
        <p>Add something from the shop and it will show up here.</p>
        <Link to="/products" className="btn" data-testid="continue-shopping">Go to shop</Link>
      </section>
    );
  }

  const submitPromo = (e) => {
    e.preventDefault();
    setPromoMsg(applyPromo(code) ? 'Code applied.' : `“${code}” isn't a valid code.`);
  };

  return (
    <section>
      <h1 className="page-title">Bag</h1>
      <div className="cart-layout">
        <ul className="cart-list" data-testid="cart-items">
          {items.map((i) => (
            <li key={i.slug + i.size} className="cart-row" data-testid={`cart-item-${i.slug}`}>
              <div>
                <Link to={`/products/${i.slug}`}><strong>{i.name}</strong></Link>
                <p className="muted">Size {i.size}</p>
              </div>
              <div className="qty">
                <button aria-label={`Decrease ${i.name}`} onClick={() => updateQty(i.slug, i.size, i.qty - 1)} data-testid="qty-decrease">−</button>
                <span data-testid="qty-value">{i.qty}</span>
                <button aria-label={`Increase ${i.name}`} onClick={() => updateQty(i.slug, i.size, i.qty + 1)} data-testid="qty-increase">+</button>
              </div>
              <p className="line-total">{money(i.qty * i.price)}</p>
              <button className="link-btn" onClick={() => removeItem(i.slug, i.size)} data-testid="remove-item">Remove</button>
            </li>
          ))}
        </ul>

        <aside className="summary" data-testid="order-summary">
          <form onSubmit={submitPromo} className="promo">
            <input placeholder="Promo code" aria-label="Promo code" value={code} onChange={(e) => setCode(e.target.value)} data-testid="promo-input" />
            <button className="btn-secondary" data-testid="promo-apply">Apply</button>
          </form>
          {promoMsg && <p className={promo ? 'success' : 'error'} data-testid="promo-message">{promoMsg}</p>}
          <dl>
            <dt>Subtotal</dt><dd data-testid="subtotal">{money(totals.subtotal)}</dd>
            {totals.discount > 0 && (<><dt>Discount ({promo.code})</dt><dd data-testid="discount">−{money(totals.discount)}</dd></>)}
            <dt>Delivery</dt><dd data-testid="shipping">{totals.shipping === 0 ? 'Free' : money(totals.shipping)}</dd>
            <dt className="total">Total</dt><dd className="total" data-testid="total">{money(totals.total)}</dd>
          </dl>
          {totals.shipping > 0 && <p className="muted">Spend {money(FREE_SHIPPING_FROM - (totals.subtotal - totals.discount))} more for free delivery.</p>}
          <button className="btn full" onClick={() => navigate('/checkout')} data-testid="checkout-btn">Check out</button>
        </aside>
      </div>
    </section>
  );
}
