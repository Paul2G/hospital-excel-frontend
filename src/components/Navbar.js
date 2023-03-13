import React from "react";
import { Link, NavLink } from "react-router-dom";

import "../assets/css/navbar.css";

function Navbar() {
  return (
    <header>
      <div className="navbar-container">
        <Link className="site" to="/">
          <span className="site-name">Hospital Excel</span>
          <span className="site-subname">Pacientes</span>
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