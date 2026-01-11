import './Features.css';

function Features() {
  const features = [
    {
      title: 'Real-time Messaging',
      description: 'Send and receive messages instantly with WebSocket technology.',
    },
    {
      title: 'Group Chats',
      description: 'Create group conversations and chat with multiple friends at once.',
    },
    {
      title: 'File Sharing',
      description: 'Share images, documents, and files with your contacts.',
    },
    {
      title: 'Friend Requests',
      description: 'Connect with new friends and manage your friend list.',
    },
    {
      title: 'Secure & Private',
      description: 'Your conversations are protected with JWT authentication.',
    },
    {
      title: 'Modern UI',
      description: 'Beautiful and intuitive interface designed for the best experience.',
    },
  ];

  return (
    <div className="features">
      <h1>Features</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
