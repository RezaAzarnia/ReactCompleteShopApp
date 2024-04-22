import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import cartSlice from "../slices/cartSlice";
import productsSlice from "../slices/productsSlice";
import wishListSlice from "../slices/wishListSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    products: productsSlice,
    wishList: wishListSlice,
  },
  devTools: false,
});
