import React from "react";
import styles from "../Notfound/Notfound.module.css";
import noFoundImage from "../../assets/notFound-03.png";

const NotFound = () => {
  return (
    <div className={styles.noFoundContainer}>
      <p>WHOOPS!</p>
      <img src={noFoundImage} className={styles.imgNot} />

      <h2 className={styles.noFoundText}>No products found </h2>
    </div>
  );
};

export default NotFound;