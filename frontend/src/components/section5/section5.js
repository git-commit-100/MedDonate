import styles from "./section5.module.scss";
import Button from "../layout/Button";
import Section from "../layout/Section";
import { BsPencilSquare } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";

function Section5() {
  return (
    <div className={styles["section5-div"]}>
      <h1 className={styles["section5-header"]}>
        Are you ready to make a positive impact?
      </h1>
      <h4 className={styles["section5-desc"]}>
        Get started with MedDonate to help save medicine to save lives.
      </h4>
      <div className={styles["section5-actions"]}>
        <Button text={"Sign Up"} Icon={BsPencilSquare}></Button>
        <Button text={"Log In"} Icon={BiLogIn}></Button>
      </div>
    </div>
  );
}

export default Section(Section5, "section5", "secondary");
