import styles from "./section4.module.scss";
import Section from "../../layout/UI/Section";
import Button from "../../layout/UI/Button";
import { images } from "../../../assets/images";

function Section4() {
  return (
    <div className={styles["section4-div"]}>
      <div className={styles["section4-left"]}>
        <div className={styles["section4-info"]}>
          <h1 className={styles["section4-header"]}>
            Curious about your impact?
          </h1>
          <h3 className={styles["section4-desc"]}>
            Something useless to you can help save someone's life. Don't just
            throw away medications and drugs, rather utilize them by
            contributing to the community.
          </h3>
          <div className={styles["section4-action"]}>
            <Button
              text={"View Now"}
              className={styles["section4-btn"]}
            ></Button>
          </div>
        </div>
      </div>
      <div className={styles["img-div"]}>
        <img src={images.nurse} alt="Nurse" />
      </div>
    </div>
  );
}

export default Section(Section4, "section4", "primary");
