import React, { useState, useEffect } from "react";
import styles from "../NavBar/SearchBar.module.css";

const SearchBar = ({ searchTerm, onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(localSearchTerm);
    }
  };

  const handleSearchClick = () => {
    onSearch(localSearchTerm);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        value={localSearchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className={styles.searchButton}
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
