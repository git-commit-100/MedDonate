import styles from "./section2.module.scss";
import Section from "../layout/Section";

function Section2() {
  return (
    <div className={styles["section2-div"]}>
      <div className={styles["section2-left"]}>
        <h1 className={styles["section2-header"]}>Why medicine?</h1>
        <h3 className={styles["section2-desc"]}>
          Because our health is a fundamental part of being human. Without it,
          we have nothing.
        </h3>
      </div>
      <div className={styles["section2-right"]}>
        <h4 className={styles["section2-right-desc"]}>
          50 million Americans don’t take their prescribed medication because
          they can’t afford it. With soaring copays, deductibles, and insurance
          costs, many people are making impossible choices between medications,
          food and housing, gas to get to work, and more.
        </h4>

        <h4 className={styles["section2-right-desc"]}>
          Not taking your medications, however, often leads to even worse
          outcomes—heart attacks, strokes, and even higher costs. This is our
          nation’s most critical problem, but it doesn’t have to be.
        </h4>

        <h4 className={styles["section2-right-desc"]}>
          That’s why we’re here. MedDonate provides access so everyone gets the care
          they deserve.
        </h4>
      </div>
    </div>
  );
}

export default Section(Section2, "section2", "primary");
