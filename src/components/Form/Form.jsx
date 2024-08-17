import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Form/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  validateForm,
  setFormData,
  clearForm,
} from "../../store/slice/formSlice";
import axios from "axios";

const API_URL = "https://pf-henry-backend-ts0n.onrender.com/product/create";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const structureData = (formData) => {
  // Construir la estructura esperada por el backend
  const sizesWithStock = Object.keys(formData.stocks).filter(
    (size) => formData.stocks[size] > 0
  );

  return {
    name: formData.name,
    description: formData.description,
    images: [formData.image],
    stock: formData.stocks, // El stock es un objeto con las tallas y cantidades
    price: parseFloat(formData.price),
    gender: formData.gender,
    category: formData.category,
    brand: formData.brand,
    color: formData.color,
    size: sizesWithStock, // Se envían todas las tallas con stock asignado
    active: true,
  };
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    name,
    description,
    image,
    price,
    gender,
    category,
    sizes,
    stocks,
    color,
    brand,
    errorMessage,
    validationErrors,
  } = useSelector((state) => state.productForm);

  // Manejo de cambio en los campos de formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sizes") {
      const selectedSizes = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      dispatch(setFormData({ name, value: selectedSizes }));
    } else {
      dispatch(setFormData({ name, value }));
    }
  };

  // Manejo de cambio en los campos de stock
  const handleStockChange = (e, size) => {
    const { value } = e.target;
    const updatedStocks = { ...stocks, [size]: parseInt(value, 10) }; // Convertir a entero
    dispatch(setFormData({ name: "stocks", value: updatedStocks }));
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(validateForm());

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const structuredData = structureData({
      name,
      description,
      image,
      price,
      gender,
      category,
      sizes,
      stocks,
      color,
      brand,
    });

    try {
      await axios.post(API_URL, structuredData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Product Created Successfully");
      navigate("/home");
      dispatch(clearForm());
    } catch (error) {
      console.error("Error:", error);
      dispatch(setError("Failed to create product. Please try again."));
    }
  };

  // Manejo de la carga de imagen
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        const imageUrl = response.data.secure_url;
        dispatch(setFormData({ name: "image", value: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
        dispatch(setError("Failed to upload image. Please try again."));
      }
    } else {
      dispatch(
        setError(
          "Invalid file format. Please upload a jpg, jpeg, png, or gif file."
        )
      );
    }
  };

  return (
    <div className={styles.containerGeneral}>
      <h1 className={styles.h1Titile}>Create a New Clothing Item</h1>
      {errorMessage && (
        <div className={styles["error-message"]}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.container1}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          {validationErrors.name && (
            <p className={styles.error}>{validationErrors.name}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            required
          />
          {validationErrors.description && (
            <p className={styles.error}>{validationErrors.description}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {validationErrors.image && (
            <p className={styles.error}>{validationErrors.image}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
          {validationErrors.price && (
            <p className={styles.error}>{validationErrors.price}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
          {validationErrors.gender && (
            <p className={styles.error}>{validationErrors.gender}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jackets">Jackets</option>
          </select>
          {validationErrors.category && (
            <p className={styles.error}>{validationErrors.category}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="sizes">Sizes:</label>
          <select
            id="sizes"
            name="sizes"
            multiple
            value={sizes}
            onChange={handleChange}
            required
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          {validationErrors.sizes && (
            <p className={styles.error}>{validationErrors.sizes}</p>
          )}
        </div>

        {sizes.map((size) => (
          <div key={size} className={styles.container1}>
            <label htmlFor={`stock-${size}`}>Stock for {size}:</label>
            <input
              type="number"
              id={`stock-${size}`}
              name={`stock-${size}`}
              value={stocks[size] || ""}
              onChange={(e) => handleStockChange(e, size)}
              required
            />
          </div>
        ))}
        {validationErrors.stocks && (
          <p className={styles.error}>{validationErrors.stocks}</p>
        )}

        <div className={styles.container1}>
          <label htmlFor="color">Color:</label>
          <select
            name="color"
            id="color"
            value={color}
            onChange={handleChange}
            required
          >
            <option value="">Select Color</option>
            <option value="Yellow">Yellow</option>
            <option value="Pink">Pink</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>
          {validationErrors.color && (
            <p className={styles.error}>{validationErrors.color}</p>
          )}
        </div>
        <div className={styles.container1}>
          <label htmlFor="brand">Brand:</label>
          <select
            name="brand"
            id="brand"
            value={brand}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            <option value="Adidas">Adidas</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </select>
          {validationErrors.brand && (
            <p className={styles.error}>{validationErrors.brand}</p>
          )}
        </div>
        <div className={styles.formbuttons}>
          <Link to="/home">
            <button type="button">Back</button>
          </Link>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
