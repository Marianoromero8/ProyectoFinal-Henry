import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import styles from "../Home/Home.module.css";

import Aboutus from "../../assets/abouUs-18.png";
import arrow from "../../assets/flecha-16.png";
import arrowExit from "../../assets/flecha-17.png";
import logo from "../../assets/Untitled-1-10.png";

import { logoutUser } from "../../store/slice/authThunks";
import {
  callProductsFilters,
  setFilters,
} from "../../store/slice/productSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, filters } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(callProductsFilters(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (filt) => {
    dispatch(
      setFilters({
        ...filt,
        size: filt.size.join(","), // Convertir el array de size en una cadena separada por comas
      })
    );
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    dispatch(setFilters({ ...filters, name: search }));
  };

  const handleClear = () => {
    setSearchTerm("");
    dispatch(
      setFilters({
        size: "",
        color: "",
        gender: "",
        category: "",
        brand: "",
        minPrice: 10,
        maxPrice: 200,
        name: "",
      })
    );
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.LoginRegister}>
        {user ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}
      </div>
      <img src={logo} className={styles.logo} />
      <div className={styles.menuContainer}>
        <div className={styles.menuContainerIzq}>
          <Link to="/aboutus" className={styles.links}>
            <button className={styles.menuButton}>
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
        searchTerm={searchTerm}
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
