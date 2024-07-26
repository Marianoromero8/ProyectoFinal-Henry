import React, { useState } from 'react';
import styles from '../NavBar/SearchBar.module.css';

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      <button className={styles.clearButton} onClick={handleClear}>Clear</button>
    </div>
  );
}

export default SearchBar;