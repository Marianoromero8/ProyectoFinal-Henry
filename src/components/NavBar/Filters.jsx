import React, { useState } from "react";
import styles from "../NavBar/Filters.module.css";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    color: [],
    gender: [],
    category: [],
    brand: [],
    minPrice: "",
    maxPrice: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[name] = [...prevFilters[name], value];
      } else {
        updatedFilters[name] = prevFilters[name].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // const handleApplyFilters = () => {
  //   console.log(selectedFilters)
  //   onFilterChange(selectedFilters);
  // };

  const handleApplyFilters = () => {
    const filters = {
      ...selectedFilters,
      size: selectedFilters.size.join(","), // Convierte el array de size en una cadena si es necesario
    };
    console.log(filters);
    onFilterChange(filters);
  };

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility} className={styles.toggleButton}>
        {isVisible ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`${styles.filtersContainer} ${
          isVisible ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.filters}>
          <h3>Filters</h3>

          <div className={styles.filterSection}>
            <h4>Size</h4>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size}>
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.size.includes(size)}
                />
                <label>{size}</label>
              </div>
            ))}
          </div>

          <div className={styles.filterSection}>
            <h4>Color</h4>
            {["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White"].map(
              (color) => (
                <div key={color}>
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    onChange={handleCheckboxChange}
                    checked={selectedFilters.color.includes(color)}
                  />
                  <label>{color}</label>
                </div>
              )
            )}
          </div>

          <div className={styles.filterSection}>
            <h4>Gender</h4>
            {["Male", "Female", "Unisex"].map((gender) => (
              <div key={gender}>
                <input
                  type="checkbox"
                  name="gender"
                  value={gender}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.gender.includes(gender)}
                />
                <label>{gender}</label>
              </div>
            ))}
          </div>

          <div className={styles.filterSection}>
            <h4>Category</h4>
            {["T-shirt", "Pants", "Jackets", "Shoes"].map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.category.includes(category)}
                />
                <label>{category}</label>
              </div>
            ))}
          </div>

          <div className={styles.filterSection}>
            <h4>Brand</h4>
            {["Adidas", "Nike", "Puma", "Reebok"].map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.brand.includes(brand)}
                />
                <label>{brand}</label>
              </div>
            ))}
          </div>

          <div className={styles.priceFilter}>
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              onChange={handleInputChange}
              value={selectedFilters.minPrice}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              onChange={handleInputChange}
              value={selectedFilters.maxPrice}
            />
          </div>

          <button onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
