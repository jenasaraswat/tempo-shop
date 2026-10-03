import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="empty" data-testid="not-found">
      <h1 className="page-title">Page not found</h1>
      <p>That link doesn't go anywhere. Head back to the shop to keep browsing.</p>
      <Link to="/products" className="btn">Go to shop</Link>
    </section>
  );
}
