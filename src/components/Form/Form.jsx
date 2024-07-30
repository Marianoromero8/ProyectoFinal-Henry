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

const API_URL = "https://pf-henry-backend-ts0n.onrender.com/product/create";

const generateRandomId = () => {
  return Math.floor(Math.random() * (9999 - 15 + 1)) + 15;
};

const structureData = (formData) => {
  return {
    id: generateRandomId().toString(),
    name: formData.name,
    description: formData.description,
    images: [formData.image],
    stock: Math.floor(Math.random() * 100),
    price: parseFloat(formData.price), // Asegurar que el precio sea un número
    gender: formData.gender,
    category: formData.category,
    brand: formData.brand,
    color: formData.color,
    size: formData.size ? [formData.size] : [], // Convertir size en array si es un valor único
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
    size,
    color,
    brand,
    errorMessage,
  } = useSelector((state) => state.productForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(validateForm());
    const state = useSelector((state) => state.productForm);
    if (state.errorMessage) {
      return;
    }

    const structuredData = structureData({
      name,
      description,
      image,
      price,
      gender,
      category,
      size,
      color,
      brand,
    });
    console.log("Data being sent:", structuredData);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(structuredData),
      });

      if (!response.ok) {
        throw new Error("Error in the petition");
      }

      alert("Product Created Successfully");
      navigate("/home");
      dispatch(clearForm());
    } catch (error) {
      console.error("Error:", error);
      dispatch(setError("Failed to create product. Please try again."));
    }
  };

  return (
    <div className={styles["form-page"]}>
      <h1>Create a New Clothing Item</h1>
      {errorMessage && (
        <div className={styles["error-message"]}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={image}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
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
        </div>
        <div className={styles["form-group"]}>
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
            <option value="Shoes">Shoes</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            name="size"
            value={size}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
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
        </div>
        <div className={styles["form-group"]}>
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
        </div>
        <div className={styles["form-buttons"]}>
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
