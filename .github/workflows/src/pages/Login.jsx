import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Enter your email and password.'); return; }
    const res = login(email, password);
    if (!res.ok) { setError(res.error); return; }
    navigate(location.state?.from || '/account', { replace: true });
  };

  return (
    <section className="auth">
      <h1 className="page-title">Log in</h1>
      <form onSubmit={submit} noValidate data-testid="login-form">
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email" /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password" /></label>
        {error && <p className="error" role="alert" data-testid="login-error">{error}</p>}
        <button className="btn full" data-testid="login-submit">Log in</button>
      </form>
      <p className="muted">Demo account: demo@tempo.test / Tempo@123</p>
    </section>
  );
}
