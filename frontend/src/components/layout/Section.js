import styles from "./Section.module.scss";

//? docs
// children -> inside component
// bg -> primary / secondary
// full -> full width and height, true / false
// className

function Section({ children, bg = "primary", full = false, className }) {
  return (
    <div
      className={`${
        className ? `${className} ${styles["section"]}` : styles["section"]
      } ${full ? styles["full"] : ""} ${
        bg === "secondary" ? styles["secondary"] : styles["primary"]
      }`}
    >
      {children}
    </div>
  );
}

export default Section;
