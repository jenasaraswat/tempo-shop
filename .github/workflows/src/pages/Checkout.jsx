import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { money } from '../utils.js';

const FIELDS = [
  { name: 'fullName', label: 'Full name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'address', label: 'Address', autoComplete: 'street-address' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'postcode', label: 'Postcode', autoComplete: 'postal-code' },
];

function validate(form) {
  const errors = {};
  FIELDS.forEach((f) => { if (!form[f.name]?.trim()) errors[f.name] = `Enter your ${f.label.toLowerCase()}.`; });
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter an email like name@example.com.';
  if (form.card.replace(/\s/g, '') !== '4242424242424242') errors.card = 'Use the test card 4242 4242 4242 4242.';
  return errors;
}

export default function Checkout() {
  const { items, totals, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: user?.name || '', email: user?.email || '', address: '', city: '', postcode: '', card: '' });
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) return <Navigate to="/cart" replace />;

  const set = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  const placeOrder = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    const orderId = 'TS' + Date.now().toString().slice(-6);
    const total = totals.total;
    setPlaced(true);
    clear();
    navigate(`/order/${orderId}`, { state: { total, email: form.email } });
  };

  return (
    <section>
      <h1 className="page-title">Checkout</h1>
      <form className="checkout" onSubmit={placeOrder} noValidate data-testid="checkout-form">
        {FIELDS.map((f) => (
          <label key={f.name}>
            {f.label}
            <input type={f.type || 'text'} autoComplete={f.autoComplete} value={form[f.name]} onChange={set(f.name)}
              aria-invalid={!!errors[f.name]} data-testid={`input-${f.name}`} />
            {errors[f.name] && <span className="error" data-testid={`error-${f.name}`}>{errors[f.name]}</span>}
          </label>
        ))}
        <label>
          Card number
          <input inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.card} onChange={set('card')}
            aria-invalid={!!errors.card} data-testid="input-card" />
          {errors.card && <span className="error" data-testid="error-card">{errors.card}</span>}
        </label>
        <p className="checkout-total">Total to pay <strong data-testid="checkout-total">{money(totals.total)}</strong></p>
        <button className="btn full" data-testid="place-order">Place order</button>
      </form>
    </section>
  );
}
