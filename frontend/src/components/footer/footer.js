import styles from "./footer.module.scss";
import { images } from "../../assets/images";
import Section from "../layout/Section";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <div className={styles["footer-div"]}>
      <div className={styles["footer-left"]}>
        <img src={images.logo} alt="MedDonate" />
        <a href="mailto:hello@medDonate.org">hello@medDonate</a>
        <div className={styles["social-div"]}>
          <BsFacebook className={styles["icon"]} />
          <BsInstagram className={styles["icon"]} />
          <BsTwitter className={styles["icon"]} />
        </div>
        <h3>&copy;MedDonate Copyright 2022.</h3>
      </div>
      <div className={styles["footer-middle"]}></div>
      <div className={styles["footer-right"]}></div>
    </div>
  );
}

export default Section(Footer, "footer", "footer");
