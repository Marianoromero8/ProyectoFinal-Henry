import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://pf-henry-backend-ts0n.onrender.com/product";

// Acción para obtener productos con filtros
export const callProductsFilters = createAsyncThunk(
  "products/callProductsFilters",
  async (filters) => {
    const response = await axios.get(API_URL, { params: filters });
    return {
      products: response.data,
      total: response.headers["x-total-count"] || response.data.length, // Suponiendo que el header X-Total-Count contiene el total
    };
  }
);

export const productsDetails = createAsyncThunk(
  "products/productsDetails",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://pf-henry-backend-ts0n.onrender.com/admin/edit/${id}`, product);
      return response.data;
    } catch (err) {
      // Proporciona más detalles sobre el error
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
  filters: {
    size: "",
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
  totalProducts: 0, // Añadido para almacenar el total de productos
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateProductSuccess: (state, action) => {
      const updatedProduct = action.payload;
      if (state.productsDetails.id === updatedProduct.id) {
          state.productsDetails = updatedProduct;
      }
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callProductsFilters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(callProductsFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
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
        state.productsError = action.payload?.message || action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.productsDetails = updatedProduct;
        state.productsStatus = 'succeeded';
    })      
      .addCase(updateProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.payload || action.error.message;
    });
  },
});

export const { setFilters } = productSlice.actions;

export default productSlice.reducer;