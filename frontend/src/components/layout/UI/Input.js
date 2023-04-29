// eslint-disable-next-line no-unused-vars
import styles from "./Input.module.scss";
import { BiErrorCircle } from "react-icons/bi";

//? docs
// inputConfig -> all input properties
// label -> before input field
// required ->  true / false (only in UI)
// callback -> return true for OPTIONAL fields (disabling validation)
// errorText -> displaying error information
// useInputHook -> take value from parent component of hook
// textarea -> true / false

function Input({
  inputConfig,
  label,
  required = false,
  errorText,
  useInputHook = {},
  textarea = false,
}) {
  const { value, hasError, handleInputChange, handleInputBlur, defaultValue } =
    useInputHook;

  return (
    <div className={styles["input-div"]}>
      <div className={styles["input-label-div"]}>
        <label className={styles["input-label"]}>{label}</label>
        <p className={styles["input-required"]}>
          {required ? "Required" : "Optional"}
        </p>
      </div>
      {!textarea && (
        <input
          {...inputConfig}
          className={`${styles["input-field"]} ${
            hasError ? styles["error"] : ""
          }`}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
        />
      )}
      {textarea && (
        <textarea
          {...inputConfig}
          className={`${styles["input-field"]} ${
            hasError ? styles["error"] : ""
          }`}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      )}
      {hasError && (
        <div className={styles["validity-text-div"]}>
          <BiErrorCircle className={styles["validity-icon"]} />
          &nbsp;
          <p className={styles["validity-text"]}>{errorText}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
