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
    <div className={styles.card}>
      <img src={images[0]} alt={name} className={styles.image} />
      <div className={styles.details}>
        <h2>{name}</h2>
        <p>
          Price: <strong> {price}</strong>
        </p>
        <p>
          Stock: <strong>{stock} </strong>
        </p>
        <p>
          Brand:<strong>{brand} </strong>{" "}
        </p>
        <p>
          Category:<strong>{category}</strong>{" "}
        </p>
        <p>
          Color:<strong> {color}</strong>
        </p>
        <p>
          Size: <strong>{size} </strong>
        </p>
        <Link to={`/details/${id}`}>
          <button className={styles.detailButton}>Detail</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
