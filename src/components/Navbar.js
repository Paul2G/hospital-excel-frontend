import React from "react";
import { Link, NavLink } from "react-router-dom";

import "../assets/css/navbar.css";
import logo from "../assets/images/logo.png"

function Navbar() {
  return (
    <header>
      <div className="navbar-container">
        <Link className="site" to="/">
          <img className="site-logo" src={logo} alt="logo" />
          <span className="site-name">Hospital Excel</span>
        </Link>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/register" className="navbar-item">
                Registrar paciente
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;