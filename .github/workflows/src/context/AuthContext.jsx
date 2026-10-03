import { createContext, useContext, useState } from 'react';

// Demo-only auth: one hard-coded account, nothing is sent anywhere.
const DEMO_USER = { email: 'demo@tempo.test', password: 'Tempo@123', name: 'Demo Athlete' };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
      setUser({ email: DEMO_USER.email, name: DEMO_USER.name });
      return { ok: true };
    }
    return { ok: false, error: 'Email or password is incorrect. Use the demo account shown below.' };
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
