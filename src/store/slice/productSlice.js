import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://pf-henry-backend-ts0n.onrender.com/product";

// Acción para obtener productos con filtros
export const callProductsFilters = createAsyncThunk(
  "products/callProductsFilters",
  async (filters) => {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  }
);

export const productsDetails = createAsyncThunk(
  "products/productosDetails",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
  filters: {
    size: [],
    color: [],
    gender: [],
    category: [],
    brand: [],
    minPrice: 10,
    maxPrice: 200,
    name: "",
  },
  productsDetails: null,
  productsStatus: "idle",
  productsError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callProductsFilters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(callProductsFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(callProductsFilters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(productsDetails.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(productsDetails.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.productsDetails = action.payload;
      })
      .addCase(productsDetails.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.error.message;
      });
  },
});

export const { setFilters } = productSlice.actions;

export default productSlice.reducer;
