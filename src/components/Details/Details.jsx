import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails } from "../../store/slice/productSlice";
import style from "./Details.module.css";
import arrowExit from "../../assets/flecha-17.png";
import { useCart } from "../../hooks/useCart";
import carrito from "../../assets/CART-32.png";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productsDetails);
  const productStatus = useSelector((state) => state.products.productsStatus);
  const productError = useSelector((state) => state.products.productsError);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(productsDetails(id));
  }, [id, dispatch]);

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

  const handleAddToCart = async () => {
    if (selectedSize) {
      try {
        // Verifica que haya suficiente stock disponible
        if (product.stock[selectedSize] < quantity) {
          alert("Not enough stock available.");
          return;
        }

        addToCart({ ...product, selectedSize, quantity });

        // // Envía la actualización del stock al backend
        // const response = await axios.put(
        //   `https://pf-henry-backend-ts0n.onrender.com/admin/edit/${product.id}`,
        //   { stock: updatedStock } // Enviar el stock actualizado
        // );

        const updatedStock = {
          ...product.stock,
          [selectedSize]: product.stock[selectedSize] - quantity
        };

        const response = await axios.put(
          `https://pf-henry-backend-ts0n.onrender.com/admin/edit/${product.id}`,
          { stock: updatedStock }
        );

        alert("Product added to cart and stock updated");
      } catch (error) {
        console.error(
          "Error updating stock:",
          error.response?.data || error.message
        );
        alert(
          "There was a problem updating the stock. Check the console for details."
        );
      }
    } else {
      alert("Please select a size.");
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
              {" "}
              Price:<strong> ${product.price}</strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Color: <strong>{product.color}</strong>
            </p>
            <div className={style.sizeContainer}>
              <p className={style.pDetail}>Sizes and Stock: </p>
              <div className={style.pDetailContainer}>
                {Object.entries(product.stock || {}).length > 0 ? (
                  Object.entries(product.stock).map(([size, stock]) => (
                    <div key={size}>
                      <label>
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                        />
                        <strong>{size}: </strong>
                        {stock}
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
              Brand : <strong>{product.brand} </strong>
            </p>
            <p className={style.pDetail}>
              Gender : <strong> {product.gender}</strong>
            </p>
            <p className={style.pDetail}>
              Category : <strong>{product.category} </strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetailDescrip}>{product.description}</p>
            <button
              onClick={() => {
                handleAddToCart(product);
              }}
              className={style.containerCarr}
            >
              <img src={carrito} className={style.carrito} />
            </button>
            <Link to="/home" className={style.links}>
              <button className={style.menuButton}>
                GO TO HOME{" "}
                <img src={arrowExit} alt="" className={style.arrow} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
