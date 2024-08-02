import React from "react";
import { Link } from "react-router-dom";
import styles from "../Card/Card.module.css";

const Card = ({
  id,
  name,
  images,
  price,
  stock,
  brand,
  category,
  color,
  size,
}) => {
  return (
    <Link  to={`/details/${id}`} >
    <div className={styles.containerCard}>
      <div>
        <img src={images[0]} alt={name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <div className={styles.containerTop}>
          <div>
            <h2>{brand}</h2>
            <p>
              Color:<strong> {color}</strong>
            </p>
          </div>
          <div className={styles.containerPriceSize}>
            <p className={styles.detailPriceSize}>
              $ <strong> {price}</strong>
            </p>
            <p className={styles.detailPriceSize}>
              {" "}
              Size: <strong> {size} </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Card;
