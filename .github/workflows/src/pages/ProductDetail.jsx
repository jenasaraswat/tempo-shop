import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, SIZES } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import NotFound from './NotFound.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;
  const soldOut = product.stock === 0;
  const oneSize = product.category === 'accessories';

  const handleAdd = () => {
    const chosen = oneSize ? 'One size' : size;
    if (!chosen) { setError('Choose a size to add this to your bag.'); return; }
    addItem(product, chosen);
    setError('');
    setAdded(true);
  };

  return (
    <section className="pdp">
      <div className="pdp-image" style={{ background: product.color }} aria-hidden="true" />
      <div className="pdp-info">
        <Link to={`/products?category=${product.category}`} className="muted">Back to {product.category}</Link>
        <h1 data-testid="product-title">{product.name}</h1>
        <p className="pdp-price" data-testid="product-price">£{product.price}</p>
        <p>{product.blurb}</p>

        {!oneSize && (
          <fieldset className="sizes" disabled={soldOut}>
            <legend>Size</legend>
            {SIZES.map((s) => (
              <button key={s} type="button" className={s === size ? 'size active' : 'size'} aria-pressed={s === size}
                onClick={() => { setSize(s); setError(''); setAdded(false); }} data-testid={`size-${s}`}>
                {s}
              </button>
            ))}
          </fieldset>
        )}

        {error && <p className="error" role="alert" data-testid="size-error">{error}</p>}

        <button className="btn" onClick={handleAdd} disabled={soldOut} data-testid="add-to-bag">
          {soldOut ? 'Sold out' : 'Add to bag'}
        </button>

        {added && (
          <p className="success" role="status" data-testid="added-message">
            Added to bag. <Link to="/cart">View bag</Link>
          </p>
        )}
      </div>
    </section>
  );
}
