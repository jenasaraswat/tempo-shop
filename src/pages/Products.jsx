import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { CATEGORIES, PRODUCTS } from '../data/products.js';

const SORTS = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'featured';
  const query = params.get('q') || '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all' || value === 'featured') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const list = PRODUCTS
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort(SORTS[sort] || SORTS.featured);

  return (
    <section>
      <h1 className="page-title">Shop</h1>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={c.id === category ? 'chip active' : 'chip'}
              aria-pressed={c.id === category}
              onClick={() => update('category', c.id)}
              data-testid={`filter-${c.id}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search products" aria-label="Search products" value={query}
          onChange={(e) => update('q', e.target.value)} data-testid="search-input" />
        <select aria-label="Sort" value={sort} onChange={(e) => update('sort', e.target.value)} data-testid="sort-select">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <p className="muted" data-testid="result-count">{list.length} {list.length === 1 ? 'product' : 'products'}</p>
      {list.length === 0 ? (
        <div className="empty" data-testid="no-results">
          <p>No products match “{query}”. Try a shorter search or another category.</p>
        </div>
      ) : (
        <div className="grid" data-testid="product-grid">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </section>
  );
}
