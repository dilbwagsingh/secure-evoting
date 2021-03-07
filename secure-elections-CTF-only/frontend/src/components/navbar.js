import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <ul className="nav_links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/vote">Vote</NavLink>
          </li>
          <li>
            <NavLink to="/results">Results</NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="nav_links">
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
