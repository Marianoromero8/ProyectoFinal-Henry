import { configureStore } from "@reduxjs/toolkit"; //Aca guardamos todo, vamos a tener los estados, las acciones y los reducers
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productSlice"
import productFormReducer from "./slice/formSlice"

export const store = configureStore({
  //Tomamos la store como una caja que la queremos ordenada, por lo tanto la dividimos en slice
  reducer: {
    auth: authReducer,
    products: productsReducer,
    productForm: productFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
