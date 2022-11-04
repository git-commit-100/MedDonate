import styles from "./Button.module.scss";

//? docs
// type -> primary / secondary
// size -> sm / lg
// text -> button text
// onClick -> forwards to onClick in parent component
// Icon -> expects a component (usually an icon)
// iconAlignment -> left / right to button text
// className -> additional className in parent component

function Button({
  type = "primary",
  size = "sm",
  text,
  onClick,
  Icon,
  iconAlignment = "right",
  className,
}) {
  return (
    <button
      className={`${
        className ? `${className} ${styles["btn"]}` : styles["btn"]
      } ${type === "secondary" ? styles["secondary"] : styles["primary"]} ${
        size === "lg" ? styles["lg"] : styles["sm"]
      }`}
      onClick={onClick}
    >
      {Icon && iconAlignment === "left" && Icon}
      &nbsp;{text}&nbsp;
      {Icon && iconAlignment === "right" && Icon}
    </button>
  );
}

export default Button;
