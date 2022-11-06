/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./footer.module.scss";
import Section from "../UI/Section";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoMail } from "react-icons/io5";

function Footer() {
  return (
    <div className={styles["footer-div"]}>
      <div className={styles["footer-left"]}>
        <h3>MedDonate Inc.</h3>
        <a href="mailto:hello@medDonate.org">
          <IoMail />
          &nbsp; hello@medDonate
        </a>
        <div className={styles["social-div"]}>
          <BsFacebook className={styles["icon"]} />
          <BsInstagram className={styles["icon"]} />
          <BsTwitter className={styles["icon"]} />
        </div>
        <p>&copy;MedDonate Copyright 2022.</p>
      </div>
      <div className={styles["footer-right"]}>
        <a href="#">Donate Medicine</a>
        <a href="#">Support Our work</a>
      </div>
    </div>
  );
}

export default Section(Footer, "footer", "footer");
