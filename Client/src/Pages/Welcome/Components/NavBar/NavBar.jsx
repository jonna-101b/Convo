function NavBar() {
        return (
                <div className="nav-bar">
                        <div className="logo"></div>

                        <nav>
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/">Home</NavLink>
                        </nav>

                </div>
        );
}

export default NavBar;