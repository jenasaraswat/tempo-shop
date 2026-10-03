import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <>
      <section className="hero" data-testid="hero">
        <h1>Train<br />in what<br />moves.</h1>
        <div className="hero-side">
          <p>Kit for lifting, running and everything between. Free UK delivery over £75.</p>
          <Link to="/products" className="btn" data-testid="hero-shop-btn">Shop all gear</Link>
        </div>
      </section>
      <section>
        <h2 className="section-title">New this week</h2>
        <div className="grid" data-testid="featured-grid">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}
