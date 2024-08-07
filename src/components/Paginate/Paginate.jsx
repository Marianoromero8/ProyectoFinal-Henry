import React from "react";
import styles from "./Paginate.module.css";

const Paginate = ({ paginate, currentPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => paginate(currentPage - 1)}
        className={styles.buttomBackNext}
      >
        BACK
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        className={styles.buttomBackNext}
      >
        NEXT
      </button>
    </div>
  );
};

export default Paginate;
