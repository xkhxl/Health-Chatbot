import { createContext, useEffect, useState } from 'react';

import {
  login as loginRequest,
  getCurrentUser,
} from '../services/auth.service';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const restoreUser = async () => {
      try {
        const data = await getCurrentUser(token);

        setUser(data.user);
      } catch (error) {
        console.error('Failed to restore user:', error);

        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);

    localStorage.setItem('token', data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
