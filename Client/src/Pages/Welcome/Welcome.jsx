import { Routes, Route } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home';
import Footer from "./Components/Footer/Footer";
import './Welcome.css';


function Welcome() {
        return (
                <div className="welcome">
                        <NavBar />

                        <Routes>
                                <Route path={'/'} element={<Home />}></Route>
                                <Route path={'/about'} element={<div>About</div>}></Route>
                                <Route path={'/features'} element={<div>Features</div>}></Route>
                                <Route path={'/contacts'} element={<div>Contacts</div>}></Route>
                        </Routes>

                        <Footer />
                </div>
        );
}

export default Welcome;