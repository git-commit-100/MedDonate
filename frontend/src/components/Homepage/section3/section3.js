import styles from "./section3.module.scss";
import { images } from "../../../assets/images";
import Section from "../../layout/UI/Section";
import Button from "../../layout/UI/Button";

function Section3() {
  return (
    <div className={styles["section3-div"]}>
      <div className={styles["img-div"]}>
        <img src={images.doctorEmergency} alt="doctor Emergency" />
      </div>
      <div className={styles["section3-info"]}>
        <h1 className={styles["section3-header"]}>
          MedDonate saves medicine to save lives
        </h1>
        <h3 className={styles["section3-desc"]}>
          We’re drug donation experts aiming to be the country's largest
          distrubutor of surplus medicines. Up to $11B of unexpired, unopened
          medicine goes to waste every year. Powered by technology, MedDonate
          helps organizations like nursing homes, pharmacies ,manufacturers and
          even individuals to donate their unused medicine and get it to where
          it’s needed most.
        </h3>
        <div className={styles["section3-actions"]}>
          <Button text={"Learn More"}></Button>
        </div>
      </div>
    </div>
  );
}

export default Section(Section3, "section3", "secondary");
