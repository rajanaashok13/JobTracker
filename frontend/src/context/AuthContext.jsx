import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('jobtrack_token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Validate existing token and load user profile on startup
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('jobtrack_token');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.warn('Session expired or invalid token:', error?.response?.data?.message);
        localStorage.removeItem('jobtrack_token');
        localStorage.removeItem('jobtrack_user');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Register a new user
   */
  const register = async (name, email, password) => {
    setAuthError(null);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token: receivedToken, user: receivedUser } = response.data;

      localStorage.setItem('jobtrack_token', receivedToken);
      localStorage.setItem('jobtrack_user', JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.';
      setAuthError(message);
      return { success: false, message };
    }
  };

  /**
   * Log in an existing user
   */
  const login = async (email, password) => {
    setAuthError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: receivedToken, user: receivedUser } = response.data;

      localStorage.setItem('jobtrack_token', receivedToken);
      localStorage.setItem('jobtrack_user', JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid credentials. Please try again.';
      setAuthError(message);
      return { success: false, message };
    }
  };

  /**
   * Log out user and clear stored authentication state
   */
  const logout = () => {
    localStorage.removeItem('jobtrack_token');
    localStorage.removeItem('jobtrack_user');
    setToken(null);
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        authError,
        setAuthError,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
