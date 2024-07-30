import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails } from "../../store/slice/productSlice";
import style from "./Details.module.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productsDetails);
  const productStatus = useSelector((state) => state.products.productsStatus);
  const productError = useSelector((state) => state.products.productsError);

  useEffect(() => {
    dispatch(productsDetails(id));
  }, [id, dispatch]);

  if (productStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (productStatus === "failed") {
    return <p>Error: {productError}</p>;
  }

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
          <div>
            <h1 className={style.h1Detail}>{product.name}</h1>
            <p className={style.pDetail}>{product.description}</p>
            <p>
              <strong> Price: </strong> {product.price}
            </p>
            <p>
              <strong> Gender:</strong> {product.gender}
            </p>
            <Link to="/Home">
              <button className={style.buttonDetail}>Go to Home</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
