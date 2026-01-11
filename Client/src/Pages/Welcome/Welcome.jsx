import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Features from './components/Features/Features';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome">
      <NavBar />
      
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="contacts" element={<Contacts />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default Welcome;
