// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { productsDetails, updateProduct } from '../../store/slice/productSlice';
// import style from './EditProducts.module.css'

// const EditProducts = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [localProduct, setLocalProduct] = useState({
//     name: "",
//     description: "",
//     sizes: [],
//     stock: {},
//   });
//   const {
//     productsDetails: product,
//     productsStatus,
//     productsError,
//   } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(productsDetails(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (product && productsStatus === "succeeded") {
//       setLocalProduct({
//         name: product.name || "",
//         description: product.description || "",
//         sizes: product.stock ? Object.keys(product.stock) : [],
//         stock: product.stock || {},
//       });
//     }
//   }, [product, productsStatus]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLocalProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleStockChange = (size, value) => {
//     const quantityStock = Number(value)
//     if (quantityStock > 80) {
//       alert(`El stock no puede exceder de ${maxStock} unidades para el talle ${size}.`);
//       return;
//     }
//     setLocalProduct((prevState) => ({
//       ...prevState,
//       stock: {
//         ...prevState.stock,
//         [size]: Number(value),
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log("Submitting product:", localProduct); // Verifica los datos del producto
//     try {
//       await dispatch(updateProduct({ id, product: localProduct }));
//       navigate("/Dashboard/Products");
//     } catch (err) {
//       console.error("Error updating product:", err.message);
//       setError(
//         "An error occurred while updating the product. Please try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!product) return <div>No product found.</div>;

//   return (
//     <div className={style.containerGeneral}>
//       <div className={style.containerDatos}>
//         <h1>Edit Product</h1>
//         <form onSubmit={handleSubmit}>
//           <div className={style.contTa}>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={localProduct.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={style.contTa}>
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={localProduct.description}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={style.contTa}>
//             <label>Sizes:</label>
//             {localProduct.sizes.map((size) => (
//               <div key={size} className={style.contTa2}>
//                 <div>
//                   <strong>{size}:</strong>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="number"
//                       value={localProduct.stock[size] || ""}
//                       onChange={(e) => handleStockChange(size, e.target.value)}
//                       min="0"
//                     />
//                   </label>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button type="submit" className={style.buttonProduct}>
//             Save Changes
//           </button>
//         </form>
//         <button
//           onClick={() => navigate("/Dashboard/Products")}
//           className={style.buttonProduct}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProducts;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails, updateProduct } from "../../store/slice/productSlice";
import style from "./EditProducts.module.css";

const maxStock = 80; // Limite máximo de stock
const availableSizes = ["S", "M", "L", "XL", "XXL"];

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newSize, setNewSize] = useState(""); // Estado para el nuevo talle
  const [newStock, setNewStock] = useState(""); // Estado para el stock del nuevo talle
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

  const handleAlertError = () => {
    MySwal.fire({
      title: "Incomplete Fields",
      text: `El stock no puede exceder de ${MAX_STOCK} unidades para el talle ${size}.`,
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
  const handleStockChange = (size, value) => {
    let quantityStock = Number(value);
    if (quantityStock > maxStock) {
      quantityStock = maxStock;
      alert(
        `El stock no puede exceder de ${maxStock} unidades para el talle ${size}.`
      );
    }
    setLocalProduct((prevState) => ({
      ...prevState,
      stock: {
        ...prevState.stock,
        [size]: quantityStock,
      },
    }));
  };

  const handleAddSize = () => {
    const quantityStock = Number(newStock);
    if (!newSize || !newStock) return;

    if (localProduct.sizes.includes(newSize)) {
      alert(
        `El talle ${newSize} ya existe. Por favor ingresa un talle diferente.`
      );
      return;
    }

    if (quantityStock > maxStock) {
      alert(
        `El stock no puede exceder de ${maxStock} unidades para el nuevo talle ${newSize}.`
      );
      return;
    }

    setLocalProduct((prevState) => ({
      ...prevState,
      sizes: [...prevState.sizes, newSize],
      stock: {
        ...prevState.stock,
        [newSize]: quantityStock,
      },
    }));
    setNewSize(""); // Limpiar el campo después de agregar
    setNewStock(""); // Limpiar el campo después de agregar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

  const availableSizesToAdd = availableSizes.filter(
    (size) => !localProduct.sizes.includes(size)
  );

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
                      max={maxStock} // Limitar el input directamente
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className={style.contTa}>
            <label>Add New Size:</label>
            <select
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {availableSizesToAdd.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Stock"
              value={newStock}
              onChange={(e) => {
                let value = e.target.value;
                if (Number(value) > maxStock) {
                  value = maxStock;
                  alert(`El stock no puede exceder de ${maxStock} unidades.`);
                }
                setNewStock(value);
              }}
              min="0"
              max={maxStock} // Agrega el límite máximo al input
            />
            <button
              type="button"
              className={style.buttonProduct}
              onClick={handleAddSize}
            >
              Add Size
            </button>
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
