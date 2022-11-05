import styles from "./section1.module.scss";
import Button from "../layout/Button";
import { images } from "../../assets/images";
import Section from "../layout/Section";
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
          <Button
            text={"Donate Medicine"}
            Icon={AiOutlineArrowRight}
          ></Button>
          <Button text={"Support Our Work"}></Button>
        </div>
      </div>
      <div className="img-div">
        <img src={images.doctorHealth} alt="doctor health" className="img" />
      </div>
    </div>
  );
}
export default Section(Section1, "section1", "secondary", "no");
