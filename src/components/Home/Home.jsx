import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import Paginate from "../Paginate/Paginate";
import NotFound from "../Notfound/Notfound";
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
import { useCart } from "../../hooks/useCart";
import { CartContext } from "../../context/cart";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, filters, totalProducts } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { clearCart } = useContext(CartContext);


  useEffect(() => {
    console.log("Fetching products with filters:", {
      ...filters,
      page: currentPage,
    });
    dispatch(
      callProductsFilters({
        ...filters,
        page: currentPage,
        limit: productsPerPage,
      })
    );
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (filt) => {
    const newFilters = {
      ...filters,
      ...filt,
      size: Array.isArray(filt.size) ? filt.size.join(",") : filt.size,
    };
    console.log("Setting new filters:", newFilters);
    setCurrentPage(1); // Reinicia la página a 1 al cambiar los filtros
    dispatch(setFilters(newFilters));
    dispatch(
      callProductsFilters({ ...newFilters, page: 1, limit: productsPerPage })
    );
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    const newFilters = { ...filters, name: search };
    console.log("Setting new search filters:", newFilters);
    setCurrentPage(1); // Reinicia la página a 1 al cambiar la búsqueda
    dispatch(setFilters(newFilters));
    dispatch(
      callProductsFilters({ ...newFilters, page: 1, limit: productsPerPage })
    );
  };

  const handleClear = () => {
    setSearchTerm("");
    const initialFilters = {
      size: [],
      color: [],
      gender: [],
      category: [],
      brand: [],
      minPrice: 10,
      maxPrice: 200,
      name: "",
    };
    console.log("Clearing filters:", initialFilters);
    setCurrentPage(1); // Reinicia la página a 1 al limpiar los filtros
    dispatch(setFilters(initialFilters));
    dispatch(
      callProductsFilters({
        ...initialFilters,
        page: 1,
        limit: productsPerPage,
      })
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleLogout = async () => {
    try {
      clearCart();
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1) return; // Asegurarse de que la página no sea menor que 1
    console.log("Changing to page:", page);
    setCurrentPage(page);
    dispatch(callProductsFilters({ ...filters, page, limit: productsPerPage }));
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} />

      <div className={styles.menuContainer}>
        {user ? (
          <div className={styles.menuContainerR}>
            <button onClick={handleLogout} className={styles.menuButton}>
              LOGOUT{" "}
            </button>
          </div>
        ) : (
          <div className={styles.menuContainerR}>
            <button
              onClick={() => navigate("/login")}
              className={styles.menuButton}
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/register")}
              className={styles.menuButton}
            >
              REGISTER
            </button>
          </div>
        )}
        <div className={styles.menuContainerIzq}>
          <Link to="/aboutus" className={styles.links}>
            <button className={styles.menuButton}>ABOUT US</button>
          </Link>
          <button
            className={styles.menuButton}
            onClick={() => navigate("/cart")}
          >
            CART
          </button>
          {user && (user.role === "admin" || user.role === "superAdmin") && (
            <Link to="/form" className={styles.links}>
              <button className={styles.menuButton}>CREATE</button>
            </Link>
          )}
          {user && (user.role === "admin" || user.role === "superAdmin") && (
            <Link to="/Dashboard" className={styles.links}>
              <button className={styles.menuButton}>DASHBOARD</button>
            </Link>
          )}
        </div>
      </div>
      <NavBar
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
        searchTerm={searchTerm}
        onClearSearch={handleClearSearch}
      />
      <div className={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
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
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <NotFound />
        )}
      </div>
      <Paginate currentPage={currentPage} paginate={handlePageChange} />
    </div>
  );
};

export default Home;
