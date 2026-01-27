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
        <div className="nav-shell">
          <div className="logo">Convo</div>

          

          <div className="sign">
            <button type="button" className="log-in" onClick={handleLogin}>
              Login
            </button>
            <button type="button" className="sign-up" id='sign-up-btn' onClick={handleSignup}>
              Sign up
            </button>
          </div>
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
