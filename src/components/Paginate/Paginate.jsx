import React from "react";
import styles from "./Paginate.module.css";

const Paginate = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  let lowerLimit = Math.max(1, currentPage - 5);
  let upperLimit = Math.min(currentPage + 5, totalPages);

  if (upperLimit - lowerLimit + 1 < 10) {
    if (currentPage <= 5) {
      upperLimit = Math.min(10, totalPages);
    } else {
      lowerLimit = Math.max(1, totalPages - 9);
    }
  }

  for (let i = lowerLimit; i <= upperLimit; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        BACK
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? styles.active : ""}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        NEXT
      </button>
    </div>
  );
};

export default Paginate;
