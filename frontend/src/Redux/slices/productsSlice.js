import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, getProductInfo } from "../../service/Requests/products";
import { toast } from "react-toastify";

// Slice
const initialState = {
  products: [],
  productInfo: [],
  loading: "idle",
  error: null,
};
// Async Thunks
export const fetchAllProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await fetchProducts();
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchProductInfo = createAsyncThunk(
  "fetchProduct/info",
  async (productId) => {
    try {
      const response = await getProductInfo(productId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.error.message;
        toast.error(state.error, {
          autoClose: 2000,
          closeOnClick: true,
          className: "toast-message",
        });
      })
      .addCase(fetchProductInfo.pending, (state) => {
        state.productInfo = [];
        state.loading = "loading";
      })
      .addCase(fetchProductInfo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.productInfo = [action.payload];
      })
      .addCase(fetchProductInfo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Exporting actions and reducer
// export const { getSingleProduct } = productSlice.actions;
export default productSlice.reducer;
