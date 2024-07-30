// import React, { useState } from "react";
// import styles from "../NavBar/Filters.module.css";

// const Filters = ({ onFilterChange }) => {

//   const [selectedFilters, setSelectedFilters] = useState({
//     size: '',
//     color: '',
//     gender: '',
//     category: '',
//     brand: '',
//     minPrice: '',
//     maxPrice: '',
//     nameOrder: '',
//     stockOrder: '',
//     priceOrder: ''
//   });

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleApplyFilters = () => {
//     onFilterChange(selectedFilters);
//   };

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   onFilterChange({ [name]: value })
//   // }

//   return (
//     <div className={styles.filters}>
//       <div className={styles.containerLevel1}>
//         <div>
//           <select name="size" onChange={handleFilterChange} value={selectedFilters.size}>
//             <option value="">Size</option>
//             <option value="S">S</option>
//             <option value="M">M</option>
//             <option value="L">L</option>
//             <option value="XL">XL</option>
//             <option value="XL">XXL</option>
//           </select>
//         </div>

//         <div className={styles.containerLevel2}>
//           <select name="color" onChange={handleFilterChange} value={selectedFilters.color}>
//             <option value=""></option>
//             <option value="Red">Red</option>
//             <option value="Blue">Blue</option>
//             <option value="Green">Green</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.containerLevel1}>
//         <div>
//           <select name="gender" onChange={handleFilterChange} value={selectedFilters.gender}>
//             <option value="">Gender</option>
//             <option value="">Male</option>
//             <option value="">Female</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.containerLevel1}>
//         <div>
//           <select name="category" onChange={handleFilterChange} value={selectedFilters.category}>
//             <option value="">Category</option>
//             <option value="T-shirt">T-shirt</option>
//             <option value="Pants">Pants</option>
//             <option value="Jacket">Jacket</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.containerLevel1}>
//         <div>
//           <select name="brand" onChange={handleFilterChange} value={selectedFilters.brand}>
//             <option value="">Brand</option>
//             <option value="Adidas">Adidas</option>
//             <option value="Nike">Nike</option>
//             <option value="Puma">Puma</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} value={selectedFilters.minPrice} />
//         <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} value={selectedFilters.maxPrice} />
//       </div>

//       <button onClick={handleApplyFilters}>Filter</button>

//     </div>
//   );
// };

// export default Filters;

//!-------------------------------------------------------------------------------------
import React, { useState } from "react";
import styles from "../NavBar/Filters.module.css";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    color: [],
    gender: [],
    category: [],
    brand: [],
    minPrice: '',
    maxPrice: ''
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[name] = [...prevFilters[name], value];
      } else {
        updatedFilters[name] = prevFilters[name].filter(item => item !== value);
      }
      return updatedFilters;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility} className={styles.toggleButton}>
        {isVisible ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`${styles.filtersContainer} ${isVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.filters}>
          <h3>Filters</h3>

          <div className={styles.filterSection}>
            <h4>Size</h4>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
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
            {['Red', 'Blue', 'Green'].map(color => (
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
            ))}
          </div>

          <div className={styles.filterSection}>
            <h4>Gender</h4>
            {['Male', 'Female'].map(gender => (
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
            {['T-shirt', 'Pants', 'Jacket'].map(category => (
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
            {['Adidas', 'Nike', 'Puma'].map(brand => (
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



