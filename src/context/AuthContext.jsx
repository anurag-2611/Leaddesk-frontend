import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('leaddesk_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function verify() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        setAdmin(res.data.admin);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    }
    verify();

  }, []);

  async function login(email, password) {

    const res = await api.post('/auth/login', { email, password });

    localStorage.setItem('leaddesk_token', res.data.token);

    setToken(res.data.token);
    setAdmin(res.data.admin);

    return res.data;
  }

  function logout() {
    localStorage.removeItem('leaddesk_token');
    
    setToken(null);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
