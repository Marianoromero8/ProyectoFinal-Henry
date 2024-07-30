// src/features/productForm/productFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  description: '',
  image: '',
  price: 0,
  gender: '',
  category: '',
  size: [],
  color: '',
  brand: '',
  isValid: false,
  errorMessage: '',
};

const productFormSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    setFormData(state, action) {
      return { ...state, ...action.payload };
    },
    validateForm(state) {
      const { name, description, image, price, color, brand } = state;
      if (!name.trim() || !description.trim() || !image.trim() || !price.trim() || !color.trim() || !brand.trim()) {
        state.isValid = false;
        state.errorMessage = 'All fields are required.';
      } else {
        state.isValid = true;
        state.errorMessage = '';
      }
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    clearForm(state) {
      return initialState;
    }
  }
});

export const { setFormData, validateForm, setError, clearForm } = productFormSlice.actions;
export default productFormSlice.reducer;
