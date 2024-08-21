import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./ProductsAdmin.module.css";

const API_URL = "https://pf-henry-backend-ts0n.onrender.com/admin/";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState("");

  // useEffect(() => {
  //     const fetchProducts = async () => {
  //         setLoading(true);
  //         setError(null);
  //         try {
  //             const response = await axios.get(API_URL, {
  //                 params: { name: nameFilter }
  //             });
  //             // setProducts(response.data);
  //             if (Array.isArray(response.data)) {
  //                 setProducts(response.data);
  //             } else {
  //                 setProducts([]); // o manejar esto de manera diferente según el caso
  //             }
  //         } catch (err) {
  //             setError(err.message);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };
  //     fetchProducts();
  // }, [nameFilter]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: { name: nameFilter },
        });

        // Asegúrate de que la respuesta sea un array
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]); // o manejar esto de manera diferente según el caso
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [nameFilter]);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleToggleProductStatus = async (id) => {
    try {
      await axios.put(`${API_URL}delete/${id}`);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, active: !product.active } : product
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={style.containerGeneral}>
      <div className={style.containerDatos}>
        <h1>Products Admin</h1>

        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={handleNameFilterChange}
          className={style.inputProduct}
        />
        <ul>
          {products.map((product) => (
            <li key={product.id} className={style.ulProduct}>
              {product.name} -{" "}
              <strong>{product.active ? "Active" : "Inactive"}</strong>
              <div>
                <button onClick={() => handleToggleProductStatus(product.id)}>
                  {product.active ? "Desactivate" : "Activate"}
                </button>
                <Link to={`/Dashboard/Products/edit/${product.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/Dashboard" className={style.buttonProduct}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default ProductsAdmin;
