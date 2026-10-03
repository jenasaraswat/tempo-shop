import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { totals } = useCart();
  const { user } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="logo" data-testid="logo">TEMPO<span>supply</span></Link>
      <nav className="nav" aria-label="Main">
        <NavLink to="/products" end data-testid="nav-shop">Shop</NavLink>
        <Link to="/products?category=tops" data-testid="nav-tops">Tops</Link>
        <Link to="/products?category=bottoms" data-testid="nav-bottoms">Bottoms</Link>
      </nav>
      <div className="header-actions">
        <NavLink to={user ? '/account' : '/login'} data-testid="nav-account">
          {user ? user.name.split(' ')[0] : 'Log in'}
        </NavLink>
        <NavLink to="/cart" className="cart-link" data-testid="nav-cart">
          Bag <span className="badge" data-testid="cart-count">{totals.count}</span>
        </NavLink>
      </div>
    </header>
  );
}
