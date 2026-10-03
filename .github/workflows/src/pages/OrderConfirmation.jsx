import { Link, useLocation, useParams } from 'react-router-dom';
import { money } from '../utils.js';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { state } = useLocation();
  return (
    <section className="empty" data-testid="order-confirmation">
      <h1 className="page-title">Order placed</h1>
      <p>Order number <strong data-testid="order-id">{orderId}</strong></p>
      {state && <p>Total paid {money(state.total)}. In a real store a receipt would go to {state.email}.</p>}
      <Link to="/products" className="btn">Keep shopping</Link>
    </section>
  );
}
