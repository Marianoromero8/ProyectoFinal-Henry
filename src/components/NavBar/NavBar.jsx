import React from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import styles from "../NavBar/NavBar.module.css";

const NavBar = ({
  onFilterChange,
  onSearch,
  onClear,
  searchTerm,
  onClearSearch,
}) => {
  return (
    <div className={styles.navBar}>
      <Filters
        onFilterChange={onFilterChange}
        onClearFilters={onClear}
        onClearSearch={onClearSearch}
      />
      <SearchBar
        searchTerm={searchTerm}
        onSearch={onSearch}
        onClear={onClear}
      />
    </div>
  );
};

export default NavBar;
