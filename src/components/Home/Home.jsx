import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import styles from "../Home/Home.module.css";

import logo from "../../assets/Untitled-1-10.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/authThunks";

//Lo comentado es agregado por marian para la autorizacion de terceros

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // const navigate = useNavigate(); //Agregado por marian
  // const user = useSelector((state) => state.auth.user) //Agregado por marian
  // const dispatch = useDispatch(); //Agregado por marian

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        const lastSixProducts = data.slice(-6);
        setProducts(lastSixProducts);
        setFilteredProducts(lastSixProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filter) => {
    let sortedProducts = [...products];
    switch (filter) {
      case "price-asc":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1))
        );
        break;
      case "price-desc":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1))
        );
        break;
      case "size":
        const sizeOrder = ["S", "M", "L", "XL", "XXL"];
        sortedProducts.sort(
          (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
        );
        break;
      case "color":
        const colorOrder = [
          "white",
          "grey",
          "blue",
          "green",
          "red",
          "pink",
          "black",
        ];
        sortedProducts.sort(
          (a, b) =>
            colorOrder.indexOf(a.color.toLowerCase()) -
            colorOrder.indexOf(b.color.toLowerCase())
        );
        break;
      case "gender":
        const genderOrder = ["female", "male"];
        sortedProducts.sort((a, b) => {
          const genderA = a.gender ? a.gender.toLowerCase() : "";
          const genderB = b.gender ? b.gender.toLowerCase() : "";
          return genderOrder.indexOf(genderA) - genderOrder.indexOf(genderB);
        });
        break;
      case "category":
        const categoryOrder = ["t-shirt", "pants", "jackets"];
        sortedProducts.sort(
          (a, b) =>
            categoryOrder.indexOf(a.category.toLowerCase()) -
            categoryOrder.indexOf(b.category.toLowerCase())
        );
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  const handleClear = () => {
    setFilteredProducts(products);
  };

  // --------------------------------------------
  // const handleLogout = () => { //Agregado por marian
  //   dispatch(logoutUser())
  //   .then(() => navigate('/login'))
  // }

  if (loading) {
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
          <Link to="/form">
            <button className={styles.menuButton}>CREATE</button>
          </Link>
          <Link to="/aboutus">
            <button className={styles.menuButton}>ABOUT US</button>
          </Link>
        </div>
        <Link to="/">
          <button className={styles.menuButton}>EXIT</button>
        </Link>
      </div>
      <NavBar
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            images={product.images}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
