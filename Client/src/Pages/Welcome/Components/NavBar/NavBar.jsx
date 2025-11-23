import { NavLink } from 'react-router-dom';
import ConvoLogo from '../../../../assets/Images/Welcome/Convo-logo-black.png';
import './NavBar.css';


function NavBar() {
        return (
                <div className="nav-bar">
                        <div className="logo">
                                <img src={ConvoLogo} alt="Convo logo" /> 
                        </div>

                        <nav>
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/">Home</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/about">About</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/features">Features</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/contacts">Contacts</NavLink>
                        </nav>

                        <div className="sign">
                                <p className="log-in">
                                        Log In
                                </p>

                                <p className="sign-up">
                                        Sign Up
                                </p>
                        </div>
                </div>
        );
}

export default NavBar;