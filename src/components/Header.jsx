import React from "react";
import styles from "../css/Header.module.css";
import Logo from "../assets/Logo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    // Aquí deberías implementar la lógica para cerrar sesión
    localStorage.removeItem("authToken");  // Ejemplo, eliminando el token del localStorage
    window.location.href ="https://teamelizabethmartinez.com/blog/";  // Recarga la página para reflejar el cambio de estado
  };

  return (
    <header className={styles.header}>
      <div className="boxed">
        <Link to="/" className={styles.link}>
          <img
            src={Logo}
            alt="Teamelizabeth logo"
            title="Teamelizabeth"
           width={100}
           height={80}
            loading="lazy"
            className={styles.logo}
          />
        </Link>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/create-post" className={styles.navLink}>
                Crear
              </Link>
            </li>
            <li>
              <Link to="/draft-posts" className={styles.navLink}>
                Borradores
              </Link>
            </li>

            <li>
              <Link to="/deleted-posts" className={styles.navLink}>
                Eliminados
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Salir
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;



