import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://pf-henry-backend-ts0n.onrender.com/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.images[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>Stock: {product.stock}</p>
      <p>Price: {product.price}</p>
      <p>Gender: {product.genero}</p>
      <p>Category: {product.category}</p>
      <Link to="/Home">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Details;