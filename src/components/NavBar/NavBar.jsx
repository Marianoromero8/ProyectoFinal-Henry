import React from 'react';
import Filters from './Filters';
import SearchBar from './SearchBar';
import styles from '../NavBar/NavBar.module.css';

const NavBar = ({ onFilterChange, onSearch, onClear }) => {
  return (
    <div className={styles.navBar}>
      <Filters onFilterChange={onFilterChange} />
      <SearchBar onSearch={onSearch} onClear={onClear} />
    </div>
  );
}

export default NavBar;