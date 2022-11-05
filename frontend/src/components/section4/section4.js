import Section from "../layout/Section";
import styles from "./section4.module.scss";
import { images } from "../../assets/images";
import Button from "../layout/Button";

function Section4() {
  return (
    <div className={styles["section4-div"]}>
      <div className={styles["section4-left"]}>
        <div className={styles["section4-info"]}>
          <h1 className={styles["section4-header"]}>
            Curious about our daily impact?
          </h1>
          <h3 className={styles["section4-desc"]}>
            We’re dedicated to capturing our impact through real-time records
            and metrics.
          </h3>
          <div className={styles["section4-action"]}>
            <Button text={"View Now"} className={styles["section4-btn"]}></Button>
          </div>
        </div>
      </div>
      <div className={styles["section4-right"]}>
        <img src={images.nurse} alt="Nurse" />
      </div>
    </div>
  );
}

export default Section(Section4, "section4", "primary");
