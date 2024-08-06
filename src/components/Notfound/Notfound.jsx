import React from "react";
import styles from "../Notfound/Notfound.module.css";
import noFoundImage from "../../assets/Notfound.jpg";

const NotFound = () => {
  return (
    <div className={styles.noFoundContainer}>
      <p>WHOOPS!</p>
      <h1>404</h1>

      <h2 className={styles.noFoundText}>No products found </h2>

    </div>
  );
};

export default NotFound;
