import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "../../service/Requests/users";
import { toast } from "react-toastify";

let userValue = null;

const getUserInfoCookie = document.cookie.split(";").some((item) => {
  if (item.includes("userData")) {
    userValue = JSON.parse(item.substring(item.indexOf("{")));
    return userValue;
  }
});
const initialState = {
  userInfo: userValue || null,
  isLogin: getUserInfoCookie ? true : false,
  status: "",
  isLoading: true,
  error: null,
};
export const loginAsync = createAsyncThunk("login", async (data) => {
  try {
    const response = await LoginUser(data);
    return response;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      //clear the cookie
      document.cookie =
        "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      state.isLogin = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      const date = new Date();

      const { userInfo, status } = action.payload;

      document.cookie = `userData=${JSON.stringify(
        userInfo
      )};expires=${new Date(
        date.getTime() + 1 * 24 * 60 * 60 * 1000
      ).toUTCString()};path=/`;

      state.userInfo = userInfo;
      state.status = status;
      state.isLogin = true;
      state.isLoading = false;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      toast.error(action.error.message, {
        autoClose: 2000,
        closeOnClick: true,
      });
    });
  },
});
export default userSlice.reducer;

export const { handleLoginUser, handleLogout } = userSlice.actions;
