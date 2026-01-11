import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="headlines">
        <p className="main">
          Ready to make some friends?
        </p>
        <p className="sub">
          Fast, friendly and built for the way you talk.
        </p>
      </div>

      <div className="image">
        <div style={{
          width: '100%',
          height: '400px',
          background: 'linear-gradient(135deg, #942678 0%, #7c1b64 100%)',
          borderRadius: 'var(--primary-border-radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          Convo
        </div>
      </div>
    </div>
  );
}

export default Home;
