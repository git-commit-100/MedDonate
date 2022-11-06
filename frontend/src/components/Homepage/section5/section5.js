import styles from "./section5.module.scss";
import Button from "../../layout/UI/Button";
import Section from "../../layout/UI/Section";
import { BsArrowRight } from "react-icons/bs";

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
        <Button text={"Register Now"} Icon={BsArrowRight}></Button>
      </div>
    </div>
  );
}

export default Section(Section5, "section5", "secondary");
