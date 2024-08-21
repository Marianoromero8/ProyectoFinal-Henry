import React from "react";
import styles from "../Loader/Loader.module.css";

const Loader = () => {
  return (
    <div class={styles.dotsloader}>
      <div class={styles.dot}></div>
      <div class={styles.dot}></div>

      <div class={styles.dot}></div>
    </div>
  );
};

export default Loader;
