// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Loader from "../Loader/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { productsDetails } from "../../store/slice/productSlice";
// import style from "./Details.module.css";
// import arrowExit from "../../assets/flecha-17.png";
// import { useCart } from "../../hooks/useCart";

// const Details = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.products.productsDetails);
//   const productStatus = useSelector((state) => state.products.productsStatus);
//   const productError = useSelector((state) => state.products.productsError);
//   const { addToCart } = useCart();


//   useEffect(() => {
//     dispatch(productsDetails(id));
//   }, [id, dispatch]);

//   if (productStatus === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (productStatus === "failed") {
//     return <p>Error: {productError}</p>;
//   }

//   return (
//     <div>
//       {product && (
//         <div className={style.container}>
//           <div>
//             <img
//               src={product?.images?.[0]}
//               alt={product?.name}
//               className={style.imgDetail}
//             />
//           </div>
//           <div className={style.containerRDetail}>
//             <h1 className={style.h1Detail}>{product.name}</h1>
//             Price:<strong> ${product.price}</strong>
//             <hr className={style.hrDetail}></hr>
//             <p className={style.pDetail}>
//               Color: <strong>{product.color}</strong>
//             </p>
//             <div className={style.sizeContainer}>
//               <p className={style.pDetail}>Sizes and Stock: </p>
//               <div className={style.pDetailContainer}>
//                 {Object.entries(product.stock).map(([size, stock]) => (
//                   <div key={size}>
//                     <strong>{size}: </strong>
//                     {stock}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <hr className={style.hrDetail}></hr>
//             <p className={style.pDetail}>
//               {" "}
//               Brand : <strong>{product.brand} </strong>
//             </p>
//             <p>
//               Gender : <strong> {product.gender}</strong>
//             </p>
//             <p>
//               Category : <strong>{product.category} </strong>
//             </p>
//             <hr className={style.hrDetail}></hr>
//             <p className={style.pDetailDescrip}>{product.description}</p>
//             <button onClick={() => { addToCart(product) }}>Icono de carrito</button>
//             <Link to="/home" className={style.links}>
//               <button className={style.menuButton}>
//                 GO TO HOME{" "}
//                 <img src={arrowExit} alt="" className={style.arrow} />
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Details;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails } from "../../store/slice/productSlice";
import style from "./Details.module.css";
import arrowExit from "../../assets/flecha-17.png";
import { useCart } from "../../hooks/useCart";
import axios from 'axios';

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
    const errorMessage = typeof productError === 'object'
      ? productError?.message || 'Unknown error occurred'
      : productError;

    return <p>Error: {errorMessage}</p>;
  }

  const handleAddToCart = async () => {
    if (selectedSize) {
      try {
        addToCart({ ...product, selectedSize, quantity });

        await axios.put(
          `https://pf-henry-backend-ts0n.onrender.com/admin/edit/${product.id}`,
          { size: selectedSize, quantity }
        );
        alert('Product added to cart and stock updated');
      } catch (error) {
        console.error('Error updating stock:', error.response?.data || error.message);
        alert('There was a problem updating the stock. Check the console for details.');
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
            Price:<strong> ${product.price}</strong>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Color: <strong>{product.color}</strong>
            </p>
            <div className={style.sizeContainer}>
              <p className={style.pDetail}>Sizes and Stock: </p>
              <div className={style.pDetailContainer}>
                {Object.entries(product.stock || {}).map(([size, stock]) => (
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
                ))}
              </div>
            </div>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Brand : <strong>{product.brand} </strong>
            </p>
            <p>
              Gender : <strong> {product.gender}</strong>
            </p>
            <p>
              Category : <strong>{product.category} </strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetailDescrip}>{product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
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
