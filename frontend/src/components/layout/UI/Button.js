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
  disabled,
  btnConfig,
}) {
  return (
    <button
      {...btnConfig}
      className={`${
        className ? `${className} ${styles["btn"]}` : styles["btn"]
      } ${type === "secondary" ? styles["secondary"] : styles["primary"]} ${
        size === "lg" ? styles["lg"] : styles["sm"]
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && iconAlignment === "left" && (
        <Icon className={styles["btn-icon"]} />
      )}
      &nbsp;{text}&nbsp;
      {Icon && iconAlignment === "right" && (
        <Icon className={styles["btn-icon"]} />
      )}
    </button>
  );
}

export default Button;
