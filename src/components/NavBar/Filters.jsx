import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, callProductsFilters } from "./../../store/slice/productSlice"; // Asegúrate de importar correctamente
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../NavBar/Filters.module.css";

const Filters = ({ onFilterChange, onClearFilters }) => {
  const dispatch = useDispatch();
  const globalFilters = useSelector((state) => state.products.filters);

  const [isVisible, setIsVisible] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState(globalFilters);

  const handleFilterChange = useCallback(
    (updatedFilters) => {
      setSelectedFilters(updatedFilters);
      dispatch(setFilters(updatedFilters));
      dispatch(callProductsFilters(updatedFilters));
    },
    [dispatch]
  );
//sabes donde es la ruta?

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const newValues = checked
      ? [...selectedFilters[name], value]
      : selectedFilters[name].filter((v) => v !== value);
    handleFilterChange({ ...selectedFilters, [name]: newValues });
  };

  const handlePriceChange = (values) => {
    setSelectedFilters({
      ...selectedFilters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handlePriceChangeComplete = (values) => {
    handleFilterChange({
      ...selectedFilters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleClear = () => {
    const initialFilters = {
      size: [],
      color: [],
      gender: [],
      category: [],
      brand: [],
      minPrice: 10,
      maxPrice: 200,
    };
    handleFilterChange(initialFilters);
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
                  id={`size-${size}`}
                  value={size}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.size.includes(size)}
                />
                <label htmlFor={`size-${size}`}>{size}</label>
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
                    id={`color-${color}`}
                    value={color}
                    onChange={handleCheckboxChange}
                    checked={selectedFilters.color.includes(color)}
                  />
                  <label htmlFor={`color-${color}`}>{color}</label>
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
                  id={`gender-${gender}`}
                  value={gender}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.gender.includes(gender)}
                />
                <label htmlFor={`gender-${gender}`}>{gender}</label>
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
                  id={`category-${category}`}
                  value={category}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.category.includes(category)}
                />
                <label htmlFor={`category-${category}`}>{category}</label>
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
                  id={`brand-${brand}`}
                  value={brand}
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.brand.includes(brand)}
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ))}
          </div>

          <div className={styles.priceFilter}>
            <h4>Price</h4>
            <Slider
              range
              min={10}
              max={200}
              defaultValue={[
                globalFilters.minPrice,
                globalFilters.maxPrice,
              ]}
              onChange={handlePriceChange}
              onAfterChange={handlePriceChangeComplete}
              value={[selectedFilters.minPrice, selectedFilters.maxPrice]}
            />
            <div className={styles.priceValues}>
              <span>${selectedFilters.minPrice}</span> -{" "}
              <span>${selectedFilters.maxPrice}</span>
            </div>
          </div>

          <button className={styles.clearButton} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
