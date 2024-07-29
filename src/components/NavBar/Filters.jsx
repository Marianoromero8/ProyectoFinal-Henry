import React from "react";
import styles from "../NavBar/Filters.module.css";

const Filters = ({ onFilterChange }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.containerLevel1}>
        <div>
          <p>
            <strong> Name</strong>
          </p>
        </div>

        <div className={styles.containerLevel2}>
          <button
            className={styles.filterButton}
            onClick={() => onFilterChange("name-asc")}
          >
            A-Z
          </button>
          <button
            className={styles.filterButton}
            onClick={() => onFilterChange("name-desc")}
          >
            Z-A
          </button>
        </div>
      </div>

      <div className={styles.containerLevel1}>
        <div>
          <p>
            <strong> Stock</strong>
          </p>
        </div>

        <div className={styles.containerLevel2}>
          <button
            className={styles.filterButton}
            onClick={() => onFilterChange("stock-asc")}
          >
            {" "}
            Asc
          </button>
          <button
            className={styles.filterButton}
            onClick={() => onFilterChange("stock-desc")}
          >
            Desc
          </button>
        </div>
      </div>

      <div className={styles.containerLevel1}>
        <div>
          <p>
            <strong> Price </strong>
          </p>
        </div>
        <div className={styles.containerLevel2}>
          <button
            className={styles.filterButton}
            onClick={() => onFilterChange("price-asc")}
          >
            Asc
          </button>
          <button
            className={styles.filterButton}
            onClick={() => onFilterChange("price-desc")}
          >
            Desc
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
