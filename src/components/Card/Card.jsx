import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Card/Card.module.css';

const Card = ({ id, name, images, price, stock }) => {
  return (
    <div className={styles.card}>
      <img src={images[0]} alt={name} className={styles.image} />
      <div className={styles.details}>
        <h2>{name}</h2>
        <p>Price: {price}</p>
        <p>Stock: {stock}</p>
        <Link to={`/details/${id}`}>
          <button className={styles.detailButton}>Detail</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;