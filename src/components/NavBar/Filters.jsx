import React from 'react';
import styles from '../NavBar/Filters.module.css';

const Filters = ({ onFilterChange }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.containerFilters}>
      <button className={styles.filterButton} onClick={() => onFilterChange('name-asc')}>Name A-Z</button>
      <button className={styles.filterButton} onClick={() => onFilterChange('name-desc')}>Name Z-A</button>

      </div>
      <div className={styles.containerFilters}>
      <button className={styles.filterButton} onClick={() => onFilterChange('stock-asc')}>Stock Asc</button>
      <button className={styles.filterButton} onClick={() => onFilterChange('stock-desc')}>Stock Desc</button>

      </div>
      <div className={styles.containerFilters}>

      <button className={styles.filterButton} onClick={() => onFilterChange('price-asc')}>Price Asc</button>
      <button className={styles.filterButton} onClick={() => onFilterChange('price-desc')}>Price Desc</button>

      </div>
    </div>
  );
}

export default Filters;