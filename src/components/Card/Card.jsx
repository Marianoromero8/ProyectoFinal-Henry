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
    <div className={styles.containerCard}>
      <div>
        <img src={images[0]} alt={name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <div className={styles.containerTop}>
          <div>
            <h2>{name}</h2>
            <p>
              Stock: <strong>{stock} </strong>
            </p>
          </div>
          <div className={styles.containerPriceSize}>
            <p className={styles.detailPriceSize}>
              $ <strong> {price}</strong>
            </p>
            <p className={styles.detailPriceSize}>
              Size: <strong>{size} </strong>
            </p>
          </div>
        </div>
        <div className={styles.containerdown}>
          <div className={styles.detaip}>
            <p>
              Brand:<strong>{brand} </strong>
            </p>{" "}
            <p>
              Category:<strong>{category}</strong>
            </p>
            <p>
              Color:<strong> {color}</strong>
            </p>
          </div>
          <div>
            <Link to={`/details/${id}`}>
              <button className={styles.detailButton}>Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
