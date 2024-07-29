import React from "react";
import styles from "../NavBar/Filters.module.css";

const Filters = ({ onFilterChange }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.containerFilters}>
        <button
          className={styles.filterButton}
          onClick={() => onFilterChange("price-asc")}
        >
          Price Asc
        </button>
        <button
          className={styles.filterButton}
          onClick={() => onFilterChange("price-desc")}
        >
          Price Desc
        </button>
      </div>
      <div className={styles.containerFilters}>
        <button
          className={styles.filterButton}
          onClick={() => onFilterChange("size")}
        >
          Size
        </button>
        <button
          className={styles.filterButton}
          onClick={() => onFilterChange("gender")}
        >
          Gender
        </button>
      </div>
      <div className={styles.containerFilters}>
        <button
          className={styles.filterButton}
          onClick={() => onFilterChange("color")}
        >
          Color
        </button>
        <button
          className={styles.filterButton}
          onClick={() => onFilterChange("category")}
        >
          Category
        </button>
      </div>
    </div>
  );
};

export default Filters;
