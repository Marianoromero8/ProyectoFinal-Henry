import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Accion para obtener productos con filtros
export const callProductsFilters = createAsyncThunk(
    'products/callProductsFilters',
    async(filters) => {
        const response = await axios.get("https://pf-henry-backend-ts0n.onrender.com/product", {params: filters});
        return response.data;
    }
)

const initialState = {
    products: [],
    status: 'idle',
    error: null,
    filters: {
        size: '',
        color: '',
        gender: '',
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
    }
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(callProductsFilters.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(callProductsFilters.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
          })
          .addCase(callProductsFilters.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },
})

export const {setFilters} = productSlice.actions;

export default productSlice.reducer;