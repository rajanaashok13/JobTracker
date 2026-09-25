import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, ArrowRight } from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import '../styles/Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  // Demo user helper for convenient portfolio reviews
  const fillDemoAccount = () => {
    setEmail('demo@jobtrack.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <div className="auth-icon-badge">
            <LogIn size={24} />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to manage and track your job applications</p>
        </div>

        {(error || authError) && (
          <AlertMessage
            type="error"
            message={error || authError}
            onClose={() => {
              setError('');
              if (setAuthError) setAuthError(null);
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="login-email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
            </div>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full auth-submit-btn"
            id="login-submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>

          {/* Quick Demo Credentials for presentation */}
          <div className="demo-credentials-banner">
            <button
              type="button"
              onClick={fillDemoAccount}
              className="btn btn-ghost btn-sm demo-btn"
              id="fill-demo-credentials"
            >
              <Sparkles size={15} color="var(--primary-600)" />
              <span>Use Demo Credentials (demo@jobtrack.com)</span>
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" id="link-to-register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
