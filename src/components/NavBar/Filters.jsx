import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilters,
  callProductsFilters,
} from "../../store/slice/productSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../NavBar/Filters.module.css";
import red from "../../assets/colors-27.png";
import blue from "../../assets/colors-25.png";
import green from "../../assets/colors-31.png";
import yellow from "../../assets/colors-24.png";
import pink from "../../assets/colors-26.png";
import black from "../../assets/colors-23.png";
import white from "../../assets/colors-30.png";

const Filters = ({ onClearFilters, onClearSearch }) => {
  const dispatch = useDispatch();
  const globalFilters = useSelector((state) => state.products.filters);
  const currentPage = useSelector((state) => state.products.currentPage);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(globalFilters);

  const handleFilterChange = useCallback(
    (updatedFilters) => {
      const formattedFilters = {
        ...updatedFilters,
        size: Array.isArray(updatedFilters.size)
          ? updatedFilters.size.join(",")
          : updatedFilters.size,
      };
      console.log("Applying filters:", formattedFilters);
      setSelectedFilters(formattedFilters);
      dispatch(setFilters(formattedFilters));
      dispatch(callProductsFilters({ ...formattedFilters, page: currentPage })); // Mantén la página actual
    },
    [dispatch, currentPage]
  );

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const newValues = Array.isArray(selectedFilters[name])
      ? checked
        ? [...selectedFilters[name], value]
        : selectedFilters[name].filter((v) => v !== value)
      : checked
        ? [value]
        : [];
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
      size: "",
      color: [],
      gender: [],
      category: [],
      brand: [],
      minPrice: 10,
      maxPrice: 200,
      name: "",
    };
    console.log("Clearing filters:", initialFilters);
    handleFilterChange(initialFilters);
    onClearSearch();
  };

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    const newSizeValue = value === "All" ? "" : value;
    handleFilterChange({ ...selectedFilters, size: newSizeValue });
  };

  return (
    <div>
      <button onClick={toggleVisibility} className={styles.toggleButton}>
        {isVisible ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`${styles.filtersContainer} ${isVisible ? styles.visible : styles.hidden
          }`}
      >
        <div>
          <h3 className={styles.h3}>Filters</h3>
          <div className={styles.filterSectionSize2}>
            <div className={styles.h4Style2}>
              <h4>Size</h4>
            </div>
            <div className={styles.ContainerSize}>
              <select
                name="size"
                id="size-select"
                onChange={handleSelectChange}
                value={selectedFilters.size}
                className={styles.containerSizeList}
              >
                <option value="All">All</option>
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.filterSectionSize}>
            <div className={styles.h4Style2}>
              <h4>Color</h4>
            </div>
            <div className={styles.ContainerSize}>
              {["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White"].map(
                (color) => (
                  <div key={color} className={styles.ContainerSize}>
                    <div className={styles.colorss}>
                      <input
                        className={styles.inputSize}
                        type="checkbox"
                        name="color"
                        id={`color-${color}`}
                        value={color}
                        onChange={handleCheckboxChange}
                        checked={selectedFilters.color.includes(color)}
                      />
                      <label htmlFor={`color-${color}`}></label>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={styles.ContainerSize}>
              {[red, blue, green, yellow, pink, black, white].map(
                (color, index) => (
                  <div key={index} className={styles.ContainerSize}>
                    <div className={styles.Sizes}>
                      <img src={color} className={styles.ContainerColorIMg} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className={styles.filterSectionGarden}>
            <div className={styles.h4Style}>
              <h4>Gender</h4>
            </div>
            <div className={styles.filterSectionGender}>
              {["Male", "Female", "Unisex"].map((gender) => (
                <div key={gender} className={styles.genderCon}>
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
          </div>

          <div className={styles.filterSectionGarden}>
            <div className={styles.h4Style}>
              <h4>Category</h4>
            </div>
            <div className={styles.filterSectionGender}>
              {["T-shirt", "Pants", "Jackets"].map((category) => (
                <div key={category} className={styles.genderCon}>
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
          </div>

          <div className={styles.filterSectionGarden}>
            <div className={styles.h4Style}>
              <h4>Brand</h4>
            </div>
            <div className={styles.filterSectionGender}>
              {["Adidas", "Nike", "Puma", "Reebok"].map((brand) => (
                <div key={brand} className={styles.genderCon}>
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
          </div>

          <div className={styles.ContainerPrice}>
            <div className={styles.h4Style2}>
              <h4>Price</h4>
            </div>
            <div className={styles.containerPrice}>
              <Slider
                range
                min={10}
                max={200}
                defaultValue={[globalFilters.minPrice, globalFilters.maxPrice]}
                onChange={handlePriceChange}
                onChangeComplete={handlePriceChangeComplete}
                value={[selectedFilters.minPrice, selectedFilters.maxPrice]}
              />
              <div className={styles.priceValues}>
                <span>${selectedFilters.minPrice} </span> -{" "}
                <span>${selectedFilters.maxPrice} </span>
              </div>
            </div>
          </div>

          <button className={styles.toggleButton} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
