import styles from "./Section.module.scss";

//? docs
// Component -> component
// bg -> primary / secondary
// full -> full width and height, true / false
// className

function Section(Component, id, bg = "primary", full = false, className) {
  return function () {
    return (
      <div
        id={id}
        className={`${
          className ? `${className} ${styles["section"]}` : styles["section"]
        } ${full ? styles["full"] : ""} ${
          bg === "secondary" ? styles["secondary"] : styles["primary"]
        } ${bg === "admin" ? styles["admin"] : ""} `}
      >
        <Component />
      </div>
    );
  };
}

export default Section;
