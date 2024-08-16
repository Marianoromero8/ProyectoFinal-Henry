import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  image: "",
  price: "",
  gender: "",
  category: "",
  sizes: [], // Manejo de múltiples tamaños
  stocks: {}, // Manejo del stock por tamaño
  color: "",
  brand: "",
  errorMessage: "",
  validationErrors: {},
};

// Funciones de validación
const validateName = (name) => name.length >= 4 && name.length <= 50;
const validateDescription = (description) =>
  description.length >= 4 && description.length <= 500;
const validateImage = (image) => /\.(jpg|png|gif)$/i.test(image);
const validatePrice = (price) => price >= 10 && price <= 200;

// Nueva validación para el stock
const validateStocks = (stocks, sizes) => {
  for (let size of sizes) {
    const stockValue = stocks[size];
    if (!stockValue || stockValue < 1 || stockValue > 80) {
      return false;
    }
  }
  return true;
};

// Función principal de validación
const performValidation = (state) => {
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
  } = state;

  let validationErrors = {};

  if (!name.trim() || !validateName(name)) {
    validationErrors.name = "Name must be between 4 and 50 characters.";
  }
  if (!description.trim() || !validateDescription(description)) {
    validationErrors.description =
      "Description must be between 4 and 500 characters.";
  }
  if (!image.trim() || !validateImage(image)) {
    validationErrors.image =
      "Image URL must be a valid .jpg, .png, or .gif file.";
  }
  if (!price.toString().trim() || !validatePrice(parseFloat(price))) {
    validationErrors.price = "Price must be between 10 and 200.";
  }
  if (!gender.trim()) {
    validationErrors.gender = "Gender is required.";
  }
  if (!category.trim()) {
    validationErrors.category = "Category is required.";
  }
  if (!sizes.length) {
    validationErrors.sizes = "At least one size must be selected.";
  } else if (!validateStocks(stocks, sizes)) {
    validationErrors.stocks =
      "Each selected size must have a valid stock (1-80).";
  }
  if (!color.trim()) {
    validationErrors.color = "Color is required.";
  }
  if (!brand.trim()) {
    validationErrors.brand = "Brand is required.";
  }

  return validationErrors;
};

// Crear el slice del formulario
const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setFormData(state, action) {
      state[action.payload.name] = action.payload.value;
      state.validationErrors = performValidation(state);
    },
    validateForm(state) {
      state.validationErrors = performValidation(state);
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    clearForm(state) {
      return initialState;
    },
  },
});

export const { setFormData, validateForm, setError, clearForm } =
  productFormSlice.actions;
export default productFormSlice.reducer;
