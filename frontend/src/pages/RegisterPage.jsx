import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import '../styles/Auth.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, isAuthenticated, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Input validations
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-check.');
      return;
    }

    setLoading(true);
    const result = await register(name.trim(), email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <div className="auth-icon-badge">
            <UserPlus size={24} />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Start organizing your applications with JobTrack today</p>
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

        <form onSubmit={handleSubmit} className="auth-form" id="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">
              Full Name
            </label>
            <div className="input-icon-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="register-name"
                className="form-input"
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
              Email Address
            </label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="register-email"
                className="form-input"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
              Password (Min. 6 characters)
            </label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="register-password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
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

          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm-password">
              Confirm Password
            </label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="register-confirm-password"
                className="form-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full auth-submit-btn"
            id="register-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" id="link-to-login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
