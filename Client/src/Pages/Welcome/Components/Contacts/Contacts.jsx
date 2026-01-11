import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts">
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you!</p>
      
      <div className="contact-info">
        <div>
          <strong>Email:</strong> support@convo.app
        </div>
        <div>
          <strong>GitHub:</strong> github.com/convo-app
        </div>
        <div>
          <strong>Support:</strong> Available 24/7
        </div>
      </div>
    </div>
  );
}

export default Contacts;
