import React from "react";
import styles from "../Notfound/Notfound.module.css";
import noFoundImage from "../../assets/Notfound.jpg";

const NotFound = () => {
  return (
    <div className={styles.noFoundContainer}>
      <p>WHOOPS!</p>
      <h1>404</h1>

      <p className={styles.noFoundText}>
        {" "}
        <h2>No products found </h2>
      </p>
    </div>
  );
};

export default NotFound;
