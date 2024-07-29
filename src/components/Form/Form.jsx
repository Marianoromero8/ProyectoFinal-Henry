import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Form/Form.module.css";
import {
  validateName,
  validateDescription,
  validateImage,
  validatePrice,
  validateColor,
  validateBrand,
} from "./Validations";

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
    price: `$${formData.price}`,
    gender: formData.gender,
    category: formData.category,
    brand: formData.brand,
    color: formData.color,
    size: formData.size,
  };
};

const Formpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    gender: "",
    category: "",
    size: "",
    color: "",
    brand: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    validateFormPresence();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormPresence = () => {
    const { name, description, image, price } = formData;
    if (name.trim() && description.trim() && image.trim() && price.trim()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const validateFullForm = () => {
    const { name, description, image, price, color, brand } = formData;
    if (!validateName(name)) {
      return "Name must be between 5 and 40 characters.";
    }
    if (!validateDescription(description)) {
      return "Description must be between 10 and 1000 characters.";
    }
    if (!validateImage(image)) {
      return "Image URL must be a valid .png, .jpg, or .gif file.";
    }
    if (!validatePrice(price)) {
      return "Price must be between 1 and 1,000,000.";
    }
    if (!validateColor(color)) {
      return "Color must be between 1 and 20 characters.";
    }
    if (!validateBrand(brand)) {
      return "Brand must be between 1 and 20 characters.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateFullForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const structuredData = structureData(formData);
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(structuredData),
      });

      if (!response.ok) {
        throw new Error("Error in the petition");
      }

      console.log("Form submitted:", structuredData);
      alert("Product Created Successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
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
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
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
            value={formData.image}
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
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jackets">Jackets</option>
          </select>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            name="size"
            value={formData.size}
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
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-buttons"]}>
          <Link to="/home">
            <button type="button">Back</button>
          </Link>
          <button type="submit" disabled={!isValid}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formpage;
