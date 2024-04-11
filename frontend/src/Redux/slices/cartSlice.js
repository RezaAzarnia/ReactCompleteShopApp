import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  deleteUserCartItem,
  getUserCartInfo,
  updateQuantity,
} from "../../service/Requests/cart";
import { toast } from "react-toastify";

const initialState = {
  userCart: [],
  cartTotalPrice: 0,
  status: "idle",
  error: null,
};

export const getUserCart = createAsyncThunk("getCartValues", async (userId) => {
  const cartValues = await getUserCartInfo(userId);
  return cartValues[0].cartItems.reverse();
});
export const addToCart = createAsyncThunk("addTo/cart", async (info) => {
  const { userId, productInfo } = info;

  const respose = await addProductToCart(userId, {
    ...productInfo,
    quantity: 1,
  });
  return respose.reverse();
});
export const handleUpdateQuantity = createAsyncThunk(
  "update/quantity",
  async (userInfo) => {
    const { userId, productId, mode } = userInfo;
    const response = await updateQuantity(userId, productId, mode);
    return response.reverse();
  }
);
export const handleDeleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async ({ userId, productId }) => {
    const response = await deleteUserCartItem(userId, productId);
    return response.reverse();
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.userCart = [];
      state.cartTotalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userCart = action.payload;

      toast.success("محصول با موفقیت به سبد خرید اضافه شد", {
        autoClose: 2000,
        closeOnClick: true,
      });
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
      toast.error(state.error, {
        autoClose: 2000,
        closeOnClick: true,
      });
    });
    builder.addCase(handleDeleteCartItem.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(handleDeleteCartItem.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.status = "";
    });
    builder.addCase(handleDeleteCartItem.rejected, (state, action) => {
      state.status = "fail";
      state.error = action.error.message;
      toast.error(state.error, {
        autoClose: 2000,
        closeOnClick: true,
      });
    });
    builder.addCase(handleUpdateQuantity.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(handleUpdateQuantity.fulfilled, (state, action) => {
      state.status = "";
      state.userCart = action.payload;
    });
  },
});
const calculateCartTotalPrice = (userCart) => {
  return userCart.reduce((accumulator, currentValue) => {
    accumulator += currentValue.quantity * currentValue.price;
    return accumulator;
  }, 0);
};
export const { clearCart } = cartSlice.actions;

export const selectCartTotalPrice = (state) => {
  return calculateCartTotalPrice(state.cart.userCart || []).toLocaleString(
    "fa-IR"
  );
};
export const selectUserCartLength = (state) => state.cart.userCart?.length || 0;
// export const
export default cartSlice.reducer;
