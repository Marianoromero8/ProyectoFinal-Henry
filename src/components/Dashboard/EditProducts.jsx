// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { productsDetails, updateProduct } from '../../store/slice/productSlice';

// // const API_URL = "https://pf-henry-backend-ts0n.onrender.com/admin/edit";

// const EditProducts = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     // const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [localProduct, setLocalProduct] = useState({
//         name: '',
//         description: '',
//         sizes: '',
//         stock: 0
//     });
//     const { productsDetails: product, productsStatus, productsError } = useSelector((state) => state.products);

//     useEffect(() => {
//         dispatch(productsDetails(id));
//     }, [dispatch, id]);

//     useEffect(() => {
//         if (product) {
//             setLocalProduct({
//                 name: product.name || '',
//                 description: product.description || '',
//                 sizes: product.sizes || '',
//                 stock: product.stock || 0
//             });
//         }
//     }, [product]);

//     // useEffect(() => {
//     //     const fetchProduct = async () => {
//     //         setLoading(true);
//     //         setError(null);
//     //         try {
//     //             const response = await axios.get(`${API_URL}/${id}`);
//     //             setProduct(response.data);
//     //         } catch (err) {
//     //             setError(err.message);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };
//     //     fetchProduct();
//     // }, [id]);

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     dispatch(updateProduct({ id, product: { ...product, [name]: value } }));
//     // };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLocalProduct(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         await axios.put(`${API_URL}/${id}`, product);
//     //         navigate("/Dashboard/Products");
//     //     } catch (err) {
//     //         console.error(err.message);
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await dispatch(updateProduct({ id, product: localProduct }));
//             navigate("/Dashboard/Products");
//         } catch (err) {
//             console.error("Error updating product:", err.message);
//             setError("An error occurred while updating the product. Please try again later.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     if (!product) return <div>No product found.</div>;

//     const safeProduct = {
//         name: typeof product.name === 'string' ? product.name : '',
//         description: typeof product.description === 'string' ? product.description : '',
//         sizes: typeof product.sizes === 'string' ? product.sizes : '',
//         stock: typeof product.stock === 'number' ? product.stock : 0
//     };

//     return (
//         <div>
//             <h1>Edit Product</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={localProduct.name}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Description:</label>
//                     <textarea
//                         name="description"
//                         value={localProduct.description}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Sizes:</label>
//                     <input
//                         type="text"
//                         name="sizes"
//                         value={localProduct.sizes}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Stock:</label>
//                     <input
//                         type="number"
//                         name="stock"
//                         value={localProduct.stock}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <button type="submit">Save Changes</button>
//             </form>
//             <button onClick={() => navigate("/Dashboard/Products")}>Cancel</button>
//         </div>
//     );
// };

// export default EditProducts;

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
        name: '',
        description: '',
        sizes: [],
        stock: {}
    });
    const { productsDetails: product, productsStatus, productsError } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(productsDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product && productsStatus === 'succeeded') {
            setLocalProduct({
                name: product.name || '',
                description: product.description || '',
                sizes: product.stock ? Object.keys(product.stock) : [],
                stock: product.stock || {}
            });
        }
    }, [product, productsStatus]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStockChange = (size, value) => {
        setLocalProduct(prevState => ({
            ...prevState,
            stock: {
                ...prevState.stock,
                [size]: value
            }
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
            setError("An error occurred while updating the product. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No product found.</div>;

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={localProduct.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={localProduct.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sizes:</label>
                    {localProduct.sizes.map(size => (
                        <div key={size}>
                            <label>
                                <strong>{size}:</strong>
                                <input
                                    type="number"
                                    value={localProduct.stock[size] || ''}
                                    onChange={(e) => handleStockChange(size, e.target.value)}
                                    min="0"
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => navigate("/Dashboard/Products")}>Cancel</button>
        </div>
    );
};

export default EditProducts;




