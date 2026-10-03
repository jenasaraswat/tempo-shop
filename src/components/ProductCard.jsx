import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const soldOut = product.stock === 0;
  return (
    <Link to={`/products/${product.slug}`} className="card" data-testid={`product-card-${product.slug}`}>
      <div className="swatch" style={{ background: product.color }} aria-hidden="true">
        {soldOut && <span className="tag">Sold out</span>}
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price" data-testid="product-price">£{product.price}</p>
      </div>
    </Link>
  );
}
