import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  image: "",
  price: "",
  gender: "",
  category: "",
  size: "",
  color: "",
  brand: "",
  errorMessage: "",
  validationErrors: {},
};

const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.length >= 4 && value.length <= 50
        ? ""
        : "Name must be between 4 and 50 characters.";
    case "description":
      return value.length >= 4 && value.length <= 500
        ? ""
        : "Description must be between 4 and 500 characters.";
    case "image":
      return /\.(jpg|png|gif)$/i.test(value)
        ? ""
        : "Image URL must be a valid .jpg, .png, or .gif file.";
    case "price":
      return value >= 10 && value <= 200
        ? ""
        : "Price must be between 10 and 200.";
    case "gender":
      return value.trim() ? "" : "Gender is required.";
    case "category":
      return value.trim() ? "" : "Category is required.";
    case "size":
      return value.trim() ? "" : "Size is required.";
    case "color":
      return value.trim() ? "" : "Color is required.";
    case "brand":
      return value.trim() ? "" : "Brand is required.";
    default:
      return "";
  }
};

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setFormData(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
      const error = validateField(name, value);
      state.validationErrors[name] = error;
      state.errorMessage = Object.values(state.validationErrors).some(
        (err) => err
      )
        ? "Please correct the errors above."
        : "";
    },
    validateForm(state) {
      const fields = [
        "name",
        "description",
        "image",
        "price",
        "gender",
        "category",
        "size",
        "color",
        "brand",
      ];
      fields.forEach((field) => {
        const error = validateField(field, state[field]);
        state.validationErrors[field] = error;
      });
      state.errorMessage = Object.values(state.validationErrors).some(
        (err) => err
      )
        ? "Please correct the errors above."
        : "";
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
