import React, { useState } from "react";
import styles from "../NavBar/Filters.module.css";

const Filters = ({ onFilterChange }) => {

  const [selectedFilters, setSelectedFilters] = useState({
    size: '',
    color: '',
    gender: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    nameOrder: '',
    stockOrder: '',
    priceOrder: ''
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   onFilterChange({ [name]: value })
  // }

  return (
    <div className={styles.filters}>
      <div className={styles.containerLevel1}>
        <div>
          <select name="size" onChange={handleFilterChange} value={selectedFilters.size}>
            <option value="">Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XL">XXL</option>
          </select>
        </div>

        <div className={styles.containerLevel2}>
          <select name="color" onChange={handleFilterChange} value={selectedFilters.color}>
            <option value=""></option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
          </select>
        </div>
      </div>

      <div className={styles.containerLevel1}>
        <div>
          <select name="gender" onChange={handleFilterChange} value={selectedFilters.gender}>
            <option value="">Gender</option>
            <option value="">Male</option>
            <option value="">Female</option>
          </select>
        </div>
      </div>

      <div className={styles.containerLevel1}>
        <div>
          <select name="category" onChange={handleFilterChange} value={selectedFilters.category}>
            <option value="">Category</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jacket">Jacket</option>
          </select>
        </div>
      </div>

      <div className={styles.containerLevel1}>
        <div>
          <select name="brand" onChange={handleFilterChange} value={selectedFilters.brand}>
            <option value="">Brand</option>
            <option value="Adidas">Adidas</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
          </select>
        </div>
      </div>

      <div>
        <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} value={selectedFilters.minPrice} />
        <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} value={selectedFilters.maxPrice} />
      </div>

      <button onClick={handleApplyFilters}>Filter</button>

    </div>
  );
};

export default Filters;
