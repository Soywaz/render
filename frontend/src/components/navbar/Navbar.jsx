// Navbar.jsx - Barra de navegación
// Usamos <Link> de React Router DOM para navegación instantánea SPA

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <span className="logo-text">Render</span>
                    <span className="logo-dot">.</span>
                </Link>
            </div>

            <ul className="navbar-links">
                <li>
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/acerca" className={location.pathname === "/acerca" ? "active" : ""}>
                        Acerca de
                    </Link>
                </li>
                <li>
                    <Link to="/registro" className={`register-btn ${location.pathname === "/registro" ? "active" : ""}`}>
                        Registro
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;