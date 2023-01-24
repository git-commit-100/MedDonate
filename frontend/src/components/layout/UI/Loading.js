import React from "react";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles["loading-wrapper"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
}

export default Loading;
