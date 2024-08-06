import React from "react";
import styles from "../Notfound/Notfound.module.css";
import noFoundImage from "../../assets/Notfound.jpg";

const NotFound = () => {
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

export default NotFound;
