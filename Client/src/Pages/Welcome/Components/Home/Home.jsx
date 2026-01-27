import { useState } from 'react';
import './Home.css';

import AuthModal from '../AuthModal/AuthModal';

function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <h1>Stay Connected, Anytime, Anywhere</h1>
          <p className="hero-sub">
            Chat effortlessly with friends and family -- no matter the distance.
          </p>
          <button onClick={handleSignup} className="primary-cta">Get Started</button>
        </div>

        <div className="hero-visual">
          <div className="hero-figure">
            <div className="figure-circle" />
            <div className="figure-person">
              <div className="person-head" />
              <div className="person-hair" />
              <div className="person-body" />
              <div className="person-arm left" />
              <div className="person-arm right" />
            </div>
            <div className="chat-bubble bubble-top" />
            <div className="chat-bubble bubble-side" />
            <div className="sparkles">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="feature-panels">
        <div className="panel panel-yellow">
          <div className="panel-copy">
            <h3>Real-Time Messaging</h3>
            <p>
              Experience instant communication with real-time messaging. Send and receive messages instantly, share photos and videos, and never miss a message. Stay in the loop, whether you are at home or on the go.
            </p>
          </div>
          <div className="panel-illustration">
            <div className="circle" />
            <div className="bubble" />
          </div>
        </div>

        <div className="panel panel-dark">
          <div className="panel-copy">
            <h3>Group Chats Made Easy</h3>
            <p>
              Create group chats to keep everyone in the conversation. Organize your chats by topics or events, share updates, and make plans together. It has never been easier to coordinate with friends or collaborate with teammates.
            </p>
          </div>
          <div className="panel-illustration">
            <div className="circle" />
            <div className="bubble" />
          </div>
        </div>
      </section>
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

export default Home;
