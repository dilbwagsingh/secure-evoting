import React from "react";
import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <ul className={styles.nav_links}>
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
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;