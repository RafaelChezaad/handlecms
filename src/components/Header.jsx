import React from "react";
import styles from "../css/Header.module.css";
import Logo from "../assets/Logo.webp";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className="boxed">
        <img
          src={Logo}
          alt="Teamelizabeth logo"
          title="Teamelizabeth"
          width={200}
          height={100}
          loading="lazy"
        />
        <button className={styles.button} aria-label="boton para crear post">
          Crear post
        </button>
      </div>
    </header>
  );
};

export default Header;
