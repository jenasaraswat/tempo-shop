import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="auth" data-testid="account-page">
      <h1 className="page-title">Hi, {user.name}</h1>
      <p>Signed in as <span data-testid="account-email">{user.email}</span></p>
      <button className="btn-secondary" onClick={() => { logout(); navigate('/'); }} data-testid="logout-btn">Log out</button>
    </section>
  );
}
