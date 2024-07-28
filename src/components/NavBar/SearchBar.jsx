import React, { useState } from 'react';
import styles from '../NavBar/SearchBar.module.css';
import search from '../../assets/icnos-14.png'
import clear from '../../assets/icnos-15.png'

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
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleChange}
      />
      <div className={styles.buttonContainer}>

        <button className={styles.searchButton} onClick={handleSearch}>
          <img src={search} alt=""  className={styles.imgButton}/>
        </button>

        <button className={styles.searchButton} onClick={handleClear}>
          <img src={clear} alt=""   className={styles.imgButton} />
         </button>

      </div>
    </div>
  );
}

export default SearchBar;