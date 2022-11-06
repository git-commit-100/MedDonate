import styles from "./section1.module.scss";
import Section from "../../layout/UI/Section";
import Button from "../../layout/UI/Button";
import { images } from "../../../assets/images";
import { AiOutlineArrowRight } from "react-icons/ai";

function Section1() {
  return (
    <div className={styles["section1-div"]}>
      <div className={styles["section1-info"]}>
        <h1 className={styles["section1-header"]}>
          Reimagining access for those in need
        </h1>
        <h3 className={styles["section1-desc"]}>
          MedDonate drives the future of healthcare by connecting people with
          surplus medications.
        </h3>
        <div className={styles["section1-actions"]}>
          <Button text={"Donate Medicine"} Icon={AiOutlineArrowRight}></Button>
          <Button text={"Support Our Work"}></Button>
        </div>
      </div>

      <div className={styles["img-div"]}>
        <img
          src={images.doctorHealth}
          alt="doctor health"
          className={styles["img"]}
        />
      </div>
    </div>
  );
}
export default Section(Section1, "section1", "secondary");
