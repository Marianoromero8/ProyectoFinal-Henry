import React from "react";
import styles from "../Nofound/Nofound.module.css";
import noFoundImage from "../../assets/Nofound.jpg";

const NoFound = () => {
  return (
    <div className={styles.noFoundContainer}>
      <img
        src={noFoundImage}
        alt="No products found"
        className={styles.noFoundImage}
      />
      <p className={styles.noFoundText}>No products found</p>
    </div>
  );
};

export default NoFound;
