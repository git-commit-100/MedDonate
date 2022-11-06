import { images } from "../../../assets/images";
import styles from "./navbar.module.scss";
import { BiHomeAlt, BiUserCircle, BiPhone, BiLogIn } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/store/appContext";
import { useContext } from "react";
import { GoDashboard } from "react-icons/go";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AppContext);

  function handleLogout() {
    let response = window.confirm("Are you sure you want to LOGOUT ??");
    if (response) {
      logout();
      navigate("/home");
    } else {
      return;
    }
  }

  return (
    <div className={styles["navbar"]}>
      <nav className={styles["nav"]}>
        <img
          src={images.logo}
          alt="MedDonate"
          className={styles["navbar-logo"]}
        />
        <ul className={styles["nav-ul"]}>
          <NavLink
            className={`${styles["nav-item"]} ${({ isActive }) =>
              isActive ? styles["active"] : ""}`}
            to="/home"
          >
            <BiHomeAlt className={styles["icon"]} />
            &nbsp;Home
          </NavLink>

          {!isLoggedIn && (
            <NavLink
              className={`${styles["nav-item"]} ${({ isActive }) =>
                isActive ? styles["active"] : ""}`}
              to="/home"
            >
              <BiUserCircle className={styles["icon"]} />
              &nbsp;About
            </NavLink>
          )}

          {!isLoggedIn && (
            <NavLink
              className={`${styles["nav-item"]} ${({ isActive }) =>
                isActive ? styles["active"] : ""}`}
              to="/home"
            >
              <BiPhone className={styles["icon"]} />
              &nbsp;Contact
            </NavLink>
          )}

          {!isLoggedIn && (
            <NavLink
              className={`${styles["nav-item"]} ${({ isActive }) =>
                isActive ? styles["active"] : ""}`}
              to="/login"
            >
              <BiLogIn className={styles["icon"]} />
              &nbsp;Login
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink
              className={`${styles["nav-item"]} ${({ isActive }) =>
                isActive ? styles["active"] : ""}`}
              to="/dashboard"
            >
              <GoDashboard className={styles["icon"]} />
              &nbsp;Dashboard
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink
              className={`${styles["nav-item"]} ${({ isActive }) =>
                isActive ? styles["active"] : ""}`}
              onClick={handleLogout}
            >
              <BiLogIn className={styles["icon"]} />
              &nbsp;Logout
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
