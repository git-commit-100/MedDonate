import { images } from "../../../assets/images";
import styles from "./navbar.module.scss";
import { BiHome, BiUserCircle, BiPhone, BiLogIn } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../utils/store/appContext";
import { useContext } from "react";
import { GoDashboard } from "react-icons/go";
import axios from "axios";

function Navbar() {
  const { isLoggedIn, logout, role, token } = useContext(AppContext);
  const user = role === "user";

  const logoutHandler = (token) => {
    axios
      .post(`http://localhost:8080/user/logout/${token}`)
      .then(() => {
        // remove client side session
        logout();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles["navbar"]}>
      <nav className={`${styles["nav"]} ${!user ? styles["admin-nav"] : ""}`}>
        <img
          src={!user ? images.adminLogo : images.logo}
          alt="MedDonate"
          className={styles["navbar-logo"]}
        />
        <ul className={styles["nav-ul"]}>
          {user && (
            <li className={styles["nav-item"]}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles["active"] : styles["link"]
                }
                to="/home"
              >
                <BiHome className={styles["icon"]} />
                Home
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li className={styles["nav-item"]}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles["active"] : styles["link"]
                }
                to="/about"
              >
                <BiUserCircle className={styles["icon"]} />
                About
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li className={styles["nav-item"]}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles["active"] : styles["link"]
                }
                to="/contact"
              >
                <BiPhone className={styles["icon"]} />
                Contact
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li className={styles["nav-item"]}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles["active"] : styles["link"]
                }
                to="/login"
              >
                <BiLogIn className={styles["icon"]} />
                Login
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li className={styles["nav-item"]}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles["active"] : styles["link"]
                }
                to={user ? "/dashboard" : "admin"}
              >
                <GoDashboard className={styles["icon"]} />
                Dashboard
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li
              className={styles["nav-item"]}
              onClick={() => logoutHandler(token)}
            >
              <NavLink className={styles["link"]}>
                <BiLogIn className={styles["icon"]} />
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
