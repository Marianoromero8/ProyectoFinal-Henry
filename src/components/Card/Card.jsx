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
  onAddToCart,
}) => {
  return (
    <div className={styles.containerCard}>
      <Link to={`/details/${id}`}>
        <div>
          <img src={images[0]} alt={name} className={styles.image} />
        </div>
        <div className={styles.details}>
          <div className={styles.containerTop}>
            <div>
              <h2>{name}</h2> {/* Mostrar el nombre del producto */}
              <p>
                Brand:<strong> {brand}</strong> {/* Mostrar la marca */}
              </p>
            </div>
            <div className={styles.containerPriceSize}>
              <p className={styles.detailPriceSize}>
                $ <strong> {price}</strong>
              </p>
              <p className={styles.detailPriceSize}>
                Color: <strong> {color} </strong> {/* Mostrar el color */}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() =>
          onAddToCart({ id, name, images, price, brand, color, category })
        }
        className={styles.buttonAdd}
      >
        ADD+
      </button>
    </div>
  );
};

export default Card;
