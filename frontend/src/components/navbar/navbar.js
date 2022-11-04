import { useState } from "react";
import { images } from "../../assets/images";
import styles from "./navbar.module.scss";
import { BiHomeAlt, BiUserCircle, BiPhone, BiLogIn } from "react-icons/bi";

function Navbar() {
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <div className={styles["navbar"]}>
      <nav className={styles["nav"]}>
        <img
          src={images.logo}
          alt="MedDonate"
          className={styles["navbar-logo"]}
        />
        <ul className={styles["nav-ul"]}>
          <li
            className={`${styles["nav-item"]} ${
              activeNav === "Home" ? styles["active"] : ""
            }`}
            onClick={() => setActiveNav("Home")}
          >
            <BiHomeAlt className={styles["icon"]} />
            &nbsp;Home
          </li>
          <li
            className={`${styles["nav-item"]} ${
              activeNav === "About" ? styles["active"] : ""
            }`}
            onClick={() => setActiveNav("About")}
          >
            <BiUserCircle className={styles["icon"]} />
            &nbsp;About
          </li>
          <li
            className={`${styles["nav-item"]} ${
              activeNav === "Contact" ? styles["active"] : ""
            }`}
            onClick={() => setActiveNav("Contact")}
          >
            <BiPhone className={styles["icon"]} />
            &nbsp;Contact
          </li>
          <li
            className={`${styles["nav-item"]} ${
              activeNav === "Login" ? styles["active"] : ""
            }`}
            onClick={() => setActiveNav("Login")}
          >
            <BiLogIn className={styles["icon"]} />
            &nbsp;Login
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
