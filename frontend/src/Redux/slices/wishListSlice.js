import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishList,
  deleteUserLikedItem,
  getUserWishList,
} from "../../service/Requests/wishList";
import { toast } from "react-toastify";

// Slice
const initialState = {
  wishlistItems: [],
  error: "",
  status: "idle",
};

// Async Thunks
export const getWishListItems = createAsyncThunk(
  "getWishlist",
  async (userId) => {
    try {
      const response = await getUserWishList(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const handleUserWishlist = createAsyncThunk(
  "addWishListItems",
  async (productInfo) => {
    try {
      const response = await addToWishList(productInfo);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const handleDeleteLikedProduct = createAsyncThunk(
  "deleteLikedItem",
  async ({ userId, productId }) => {
    try {
      const response = await deleteUserLikedItem(userId, productId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    clearWishlist: (state, action) => {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishListItems.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
      })
      .addCase(getWishListItems.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(handleUserWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleUserWishlist.fulfilled, (state, action) => {
        state.status = "completed";
        toast.success("محصول به لیست علاقه‌مندی‌ها اضافه شد", {
          autoClose: 2000,
          closeOnClick: true,
          className: "toast-message",
        });
        state.wishlistItems = action.payload;
      })
      .addCase(handleUserWishlist.rejected, (state) => {
        state.status = "error";
      })
      .addCase(handleDeleteLikedProduct.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
      });
  },
});

// Exporting actions and reducer
export const { clearWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
