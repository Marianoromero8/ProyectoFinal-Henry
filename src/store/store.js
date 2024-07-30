import { configureStore } from "@reduxjs/toolkit"; //Aca guardamos todo, vamos a tener los estados, las acciones y los reducers
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice"

export const store = configureStore({
  //Tomamos la store como una caja que la queremos ordenada, por lo tanto la dividimos en slice
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
