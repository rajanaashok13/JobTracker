import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Target,
  LayoutDashboard,
  FileSpreadsheet,
  PlusCircle,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="navbar-brand-link" id="nav-brand-logo">
          <BrandLogo size="md" badgeText="OS" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                id="nav-link-dashboard"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/applications"
                id="nav-link-applications"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <FileSpreadsheet size={18} />
                <span>Applications</span>
              </NavLink>

              <NavLink
                to="/add-job"
                id="nav-link-add-job"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <PlusCircle size={18} />
                <span>Add Application</span>
              </NavLink>
            </>
          ) : (
            <>
              <Link to="/#features" className="nav-link" id="nav-link-features">
                Features
              </Link>
              <Link to="/#how-it-works" className="nav-link" id="nav-link-how">
                How It Works
              </Link>
            </>
          )}
        </nav>

        {/* Right Section: Theme Toggle & User Actions */}
        <div className="navbar-actions">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            className="btn btn-ghost btn-icon theme-btn"
            aria-label="Toggle dark/light theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          {isAuthenticated ? (
            <div className="user-profile-menu">
              <NavLink
                to="/profile"
                id="nav-link-profile"
                className="user-pill"
                title="View Profile"
              >
                <div className="user-avatar-circle">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="user-name-display">{user?.name?.split(' ')[0] || 'User'}</span>
              </NavLink>

              <button
                onClick={handleLogout}
                id="logout-btn"
                className="btn btn-secondary btn-sm logout-button"
                title="Log out"
              >
                <LogOut size={16} />
                <span className="hide-on-mobile">Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" id="nav-login-btn" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link to="/register" id="nav-register-btn" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="mobile-toggle-btn btn btn-ghost btn-icon"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={closeMobile} className="mobile-nav-link">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/applications" onClick={closeMobile} className="mobile-nav-link">
                  <FileSpreadsheet size={18} />
                  <span>Applications</span>
                </NavLink>
                <NavLink to="/add-job" onClick={closeMobile} className="mobile-nav-link">
                  <PlusCircle size={18} />
                  <span>Add Application</span>
                </NavLink>
                <NavLink to="/profile" onClick={closeMobile} className="mobile-nav-link">
                  <User size={18} />
                  <span>Profile ({user?.name})</span>
                </NavLink>
                <button onClick={handleLogout} className="mobile-nav-link mobile-logout-btn">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobile} className="btn btn-secondary btn-full">
                  Sign In
                </Link>
                <Link to="/register" onClick={closeMobile} className="btn btn-primary btn-full">
                  Create Free Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
