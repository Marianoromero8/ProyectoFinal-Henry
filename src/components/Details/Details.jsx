import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails } from "../../store/slice/productSlice";
import style from "./Details.module.css";
import arrowExit from "../../assets/flecha-17.png";
import { useCart } from "../../hooks/useCart";
import carrito from "../../assets/CART-32.png";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productsDetails);
  const productStatus = useSelector((state) => state.products.productsStatus);
  const productError = useSelector((state) => state.products.productsError);
  const { addToCart, cart } = useCart();
  const MySwal = withReactContent(Swal);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remainingStock, setRemainingStock] = useState({});

  useEffect(() => {
    dispatch(productsDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product && product.stock) {
      const initialRemainingStock = { ...product.stock };

      cart.forEach((item) => {
        if (item.id === product.id) {
          initialRemainingStock[item.selectedSize] -= item.quantity;
        }
      });

      setRemainingStock(initialRemainingStock);
    }
  }, [product, cart]);

  const handleAlertError = () => {
    MySwal.fire({
      text: "Please select a size.",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#134eff",
      background: "#ece8e8",
      color: "black",
      iconColor: "#ff6e1f",
      customClass: {
        popup: "custom-pop  up",
      },
    });
  };

  const handleAlertComplete = () => {
    MySwal.fire({
      text: "Product added to cart",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#134eff",
      background: "#ece8e8",
      color: "black",
      iconColor: "#026e55",
      customClass: {
        popup: "custom-pop  up",
      },
    });
  };

  const handleAlertStock = () => {
    MySwal.fire({
      text: "Not enough stock available.",
      icon: "info",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#134eff",
      background: "#ece8e8",
      color: "black",
      iconColor: "#026e55",
      customClass: {
        popup: "custom-pop  up",
      },
    });
  };

  if (productStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (productStatus === "failed") {
    const errorMessage =
      typeof productError === "object"
        ? productError?.message || "Unknown error occurred"
        : productError;

    return <p>Error: {errorMessage}</p>;
  }

  const handleQuantityChange = (newQuantity) => {
    const stock = remainingStock[selectedSize] || 0;
    if (newQuantity > 0 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const stock = remainingStock[selectedSize] || 0;
      if (stock < quantity) {
        handleAlertStock();
        return;
      }

      addToCart({ ...product, selectedSize, quantity });

      setRemainingStock((prevStock) => ({
        ...prevStock,
        [selectedSize]: prevStock[selectedSize] - quantity,
      }));

      handleAlertComplete();

      setQuantity(1);
      setSelectedSize("");
    } else {
      handleAlertError();
    }
  };

  return (
    <div>
      {product && (
        <div className={style.container}>
          <div>
            <img
              src={product?.images?.[0]}
              alt={product?.name}
              className={style.imgDetail}
            />
          </div>
          <div className={style.containerRDetail}>
            <h1 className={style.h1Detail}>{product.name}</h1>
            <p className={style.pDetail}>
              Price: <strong>${product.price}</strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Color: <strong>{product.color}</strong>
            </p>
            <div className={style.pDetailContainer2}>
              <p className={style.pDetail}>Sizes and Stock:</p>
              <div className={style.pDetailContainer}>
                {Object.entries(remainingStock || {}).length > 0 ? (
                  Object.entries(remainingStock).map(([size, stock]) => (
                    <div key={size}>
                      <label>
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                          disabled={stock === 0}
                        />
                        <strong>{size}: </strong>
                        <p>{stock} </p>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No stock available</p>
                )}
              </div>
            </div>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Brand: <strong>{product.brand}</strong>
            </p>
            <p className={style.pDetail}>
              Gender: <strong>{product.gender}</strong>
            </p>
            <p className={style.pDetail}>
              Category: <strong>{product.category}</strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetailDescrip}>{product.description}</p>
            <div className={style.quantityContainer}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (remainingStock[selectedSize] || 0)}
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className={style.containerCarr}>
              <img src={carrito} className={style.carrito} alt="Add to cart" />
            </button>
            <div className={style.contbutt}>
              <Link to={`/reviews/${id}`} className={style.links}>
                <button className={style.menuButton}>GO TO REVIEWS</button>
              </Link>
              <Link to="/home" className={style.links}>
                <button className={style.menuButton}>GO TO HOME </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
