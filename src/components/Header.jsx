import React from "react";
import styles from "../css/Header.module.css";
import Logo from "../assets/Logo.webp";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className="boxed">
        <Link to="/" className={styles.link}>
          <img
            src={Logo}
            alt="Teamelizabeth logo"
            title="Teamelizabeth"
            width={100}
            height={40}
            loading="lazy"
            className={styles.logo}
          />
        </Link>

        <Link to="/create-post" className={styles.button} aria-label="boton para crear post">
          Crear post
        </Link>
      </div>
    </header>
  );
};

export default Header;
