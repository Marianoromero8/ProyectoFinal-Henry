import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import Paginate from "../Paginate/Paginate";
import NoFound from "../Nofound/Nofound";
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

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, filters } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const productsPerPage = 12;

  useEffect(() => {
    dispatch(callProductsFilters({ ...filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  useEffect(() => {
    if (products && products.length > 0) {
      setTotalProducts(products.length); // Asumiendo que la respuesta contiene la longitud total de productos
    }
  }, [products]);

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
    setCurrentPage(1); // Reiniciar a la primera página
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        {user &&
          user.role === "admin" && ( // Verificar si el usuario tiene el rol de administrador
            <Link to="/form" className={styles.links}>
              <button className={styles.menuButton}>
                CREATE <img src={arrow} alt="" className={styles.arrow} />
              </button>
            </Link>
          )}
        <Link to="/" className={styles.links}>
          <button className={styles.menuButton}>
            EXIT <img src={arrowExit} alt="" className={styles.arrow} />
          </button>
        </Link>
        <button className={styles.cartButton} onClick={() => navigate("/cart")}>
          Cart
        </button>
      </div>
      <NavBar
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
        searchTerm={searchTerm}
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
          <NoFound />
        )}
      </div>
      <Paginate
        currentPage={currentPage}
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
        paginate={handlePageChange}
      />
    </div>
  );
};

export default Home;
