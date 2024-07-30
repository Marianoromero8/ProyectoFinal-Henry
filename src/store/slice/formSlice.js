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
};

const validateName = (name) => name.length >= 4 && name.length <= 50;
const validateDescription = (description) =>
  description.length >= 4 && description.length <= 500;
const validateImage = (image) => /\.(jpg|png|gif)$/i.test(image);
const validatePrice = (price) => price >= 10 && price <= 200;

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setFormData(state, action) {
      return { ...state, ...action.payload };
    },
    validateForm(state) {
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
      } = state;

      let errorMessage = "";

      if (!name.trim() || !validateName(name)) {
        errorMessage = "Name must be between 4 and 50 characters.";
      } else if (!description.trim() || !validateDescription(description)) {
        errorMessage = "Description must be between 4 and 500 characters.";
      } else if (!image.trim() || !validateImage(image)) {
        errorMessage = "Image URL must be a valid .jpg, .png, or .gif file.";
      } else if (
        !price.toString().trim() ||
        !validatePrice(parseFloat(price))
      ) {
        errorMessage = "Price must be between 10 and 200.";
      } else if (!gender.trim()) {
        errorMessage = "Gender is required.";
      } else if (!category.trim()) {
        errorMessage = "Category is required.";
      } else if (!size.trim()) {
        errorMessage = "Size is required.";
      } else if (!color.trim()) {
        errorMessage = "Color is required.";
      } else if (!brand.trim()) {
        errorMessage = "Brand is required.";
      }

      state.errorMessage = errorMessage;
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
