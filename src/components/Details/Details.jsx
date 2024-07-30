import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails } from "../../store/slice/productSlice";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productsDetails);
  const productStatus = useSelector((state) => state.products.productsStatus)
  const productError = useSelector((state) => state.products.productsError)

  useEffect(() => {
    dispatch(productsDetails(id))
  }, [id, dispatch])

  if (productStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (productStatus === 'failed') {
    return <p>Error: {productError}</p>;
  }

  return (
    <div>
      {product && (
        <div>
          <h1>{product.name}</h1>
          <img src={product?.images?.[0]} alt={product?.name} />
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Gender: {product.gender}</p>
          <Link to="/Home">
            <button>Go to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Details;
