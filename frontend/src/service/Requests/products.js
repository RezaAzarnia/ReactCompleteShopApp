import { baseURL, handleResponse } from "../Configs/configs";

const fetchProducts = async () => {
  try {
    const response = await baseURL.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getProductInfo = async (productId) => {
  try {
    const response = await baseURL.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { fetchProducts, getProductInfo };
