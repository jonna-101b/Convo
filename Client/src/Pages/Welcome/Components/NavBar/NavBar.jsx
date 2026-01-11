import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import './NavBar.css';

function NavBar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="logo">
          Convo
        </div>

        <nav>
          <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/welcome">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/welcome/about">
            About
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/welcome/features">
            Features
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/welcome/contacts">
            Contacts
          </NavLink>
        </nav>

        <div className="sign">
          <p className="log-in" onClick={handleLogin}>
            Log In
          </p>
          <p className="sign-up" onClick={handleSignup}>
            Sign Up
          </p>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

export default NavBar;
