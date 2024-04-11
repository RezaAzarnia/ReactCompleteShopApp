import { baseURL, handleResponse } from "../Configs/configs";
import { clearUserCart } from "./cart";

const postUserOrder = async (data) => {
  try {
    const response = await baseURL.post("userOrders", data);
    await clearUserCart(data.userId);
    return handleResponse(response, "سفارش شما با موفقیت ثبت شد");
  } catch (error) {
    return Promise.reject(error);
  }
};
const getUserOrders = async (userId) => {
  try {
    const response = await baseURL.get(`/userOrders?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getOrderDetail = async (orderId) => {
  try {
    const response = await baseURL.get(`/userOrders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { postUserOrder, getUserOrders, getOrderDetail };
