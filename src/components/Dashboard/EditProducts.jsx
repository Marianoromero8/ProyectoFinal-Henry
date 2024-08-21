import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productsDetails, updateProduct } from '../../store/slice/productSlice';

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localProduct, setLocalProduct] = useState({
    name: "",
    description: "",
    sizes: [],
    stock: {},
  });
  const {
    productsDetails: product,
    productsStatus,
    productsError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && productsStatus === "succeeded") {
      setLocalProduct({
        name: product.name || "",
        description: product.description || "",
        sizes: product.stock ? Object.keys(product.stock) : [],
        stock: product.stock || {},
      });
    }
  }, [product, productsStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStockChange = (size, value) => {
    setLocalProduct((prevState) => ({
      ...prevState,
      stock: {
        ...prevState.stock,
        [size]: Number(value),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting product:", localProduct); // Verifica los datos del producto
    try {
      await dispatch(updateProduct({ id, product: localProduct }));
      navigate("/Dashboard/Products");
    } catch (err) {
      console.error("Error updating product:", err.message);
      setError(
        "An error occurred while updating the product. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className={style.containerGeneral}>
      <div className={style.containerDatos}>
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.contTa}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={localProduct.name}
              onChange={handleChange}
            />
          </div>
          <div className={style.contTa}>
            <label>Description:</label>
            <textarea
              name="description"
              value={localProduct.description}
              onChange={handleChange}
            />
          </div>
          <div className={style.contTa}>
            <label>Sizes:</label>
            {localProduct.sizes.map((size) => (
              <div key={size} className={style.contTa2}>
                <div>
                  <strong>{size}:</strong>
                </div>
                <div>
                  <label>
                    <input
                      type="number"
                      value={localProduct.stock[size] || ""}
                      onChange={(e) => handleStockChange(size, e.target.value)}
                      min="0"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className={style.buttonProduct}>
            Save Changes
          </button>
        </form>
        <button
          onClick={() => navigate("/Dashboard/Products")}
          className={style.buttonProduct}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProducts;
