import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import styles from "../Home/Home.module.css";

import Aboutus from "../../assets/abouUs-18.png";

import arrow from "../../assets/flecha-16.png";
import arrowExit from "../../assets/flecha-17.png";

import logo from "../../assets/Untitled-1-10.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slice/authThunks";
import { callProductsFilters, setFilters } from "../../store/slice/productSlice";

//Lo comentado es agregado por marian para la autorizacion de terceros

const Home = () => {

  const dispatch = useDispatch();
  const { products, status = 'loading', filters } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(callProductsFilters(filters))
  }, [dispatch, filters])

  const handleFilterChange = (filt) => {
    dispatch(setFilters(filt))
  }

  const handleSearch = (search) => {
    if (!search) {
      dispatch(setFilters({ ...filters, name: '' }));
    } else {
      dispatch(setFilters({ ...filters, name: search }))
    }
  }

  const handleClear = () => {
    dispatch(setFilters({
      size: '',
      color: '',
      gender: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
    }));
  };

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {/* <div>
      {user ? (
        <div>
        <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => {navigate('/login')}}>Login</button>
          <button onClick={() => {navigate('/register')}}>Register</button>
        </div>
      )}
      </div> */}
      <img src={logo} className={styles.logo} />
      <div className={styles.menuContainer}>
        <div className={styles.menuContainerIzq}>
          <Link to="/form" className={styles.links}>
            <button className={styles.menuButton}>
              CREATE <img src={arrow} alt="" className={styles.arrow} />
            </button>
          </Link>
          <Link to="/aboutus" className={styles.links}>
            <button className={styles.menuButton}>
              {" "}
              ABOUT US <img src={Aboutus} alt="" className={styles.arrow} />
            </button>
          </Link>
        </div>

        <Link to="/" className={styles.links}>
          <button className={styles.menuButton}>
            EXIT <img src={arrowExit} alt="" className={styles.arrow} />
          </button>
        </Link>
      </div>

      <NavBar
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <div className={styles.productList}>
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            images={product.images}
            price={product.price}
            stock={product.stock}
            brand={product.brand}
            category={product.category}
            size={product.size}
            color={product.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
