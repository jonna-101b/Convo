import { Routes, Route } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Features from './Components/Features/Features';
import Contacts from './Components/Contacts/Contacts';
import Footer from "./Components/Footer/Footer";
import './Welcome.css';


function Welcome() {
        return (
                <div className="welcome">
                        <NavBar />

                        <Routes>
                                <Route path={'/'} element={<Home />}></Route>
                                <Route path={'/about'} element={<About />}></Route>
                                <Route path={'/features'} element={<Features />}></Route>
                                <Route path={'/contacts'} element={<Contacts />}></Route>
                        </Routes>

                        <Footer />
                </div>
        );
}

export default Welcome;