import { baseURL, handleResponse } from "../Configs/configs";

const getUserCartInfo = async (userId) => {
  const userCartInfo = await baseURL.get(`/userCart?userId=${userId}`);
  const userCartValues = userCartInfo.data;
  return userCartValues;
};
const cartCreator = async (userId, cartItems) => {
  const value = { userId, cartItems: [cartItems] };
  try {
    const response = await baseURL.post("/userCart", value);
    return response.data.cartItems;
  } catch (error) {
    throw error;
  }
};
const addProductToCart = async (userId, product) => {
  const userCartInfo = await getUserCartInfo(userId);
  try {
    if (userCartInfo.length > 0) {
      const updateResponse = await cartUpdate(userId, userCartInfo, product);
      return updateResponse;
    } else {
      const createResponse = await cartCreator(userId, product);
      return createResponse;
    }
  } catch (error) {
    throw error;
  }
};

const cartUpdate = async (userId, userCartValues, product) => {
  const { id: userCartId, cartItems: existCartItems } = userCartValues[0];

  const newCartValues = [...existCartItems, product];

  const productIndex = existCartItems.findIndex(
    (item) => item.productId == product.productId
  );
  if (productIndex !== -1) {
    const update = await updateQuantity(userId, product.productId, "increase");
    return update;
  } else {
    try {
      const response = await baseURL.patch(`/userCart/${userCartId}`, {
        cartItems: newCartValues,
      });
      return response.data.cartItems;
    } catch (error) {
      throw error;
    }
  }
};
const updateQuantity = async (userId, productId, mode) => {
  const userCart = await getUserCartInfo(userId);
  const { cartItems: userCartItems, id } = userCart[0];

  const productIndex = userCartItems.findIndex((item) => item.productId == productId);

  //mode handling
  mode == "increase"
    ? (userCartItems[productIndex].quantity += 1)
    : (userCartItems[productIndex].quantity -= 1);

  try {
    const response = await baseURL.patch(`/userCart/${id}`, {
      cartItems: userCartItems,
    });
    return response.data.cartItems;
  } catch (error) {
    throw error;
  }
};

const deleteUserCartItem = async (userId, productId) => {
  const userCart = await getUserCartInfo(userId);
  const filteredCart = userCart[0].cartItems.filter((product) => {
    return product.productId != productId;
  });
  try {
    const updatedItems = await baseURL.put(`/userCart/${userCart[0].id}`, {
      userId: userId,
      cartItems: filteredCart,
    });
    return updatedItems.data.cartItems;
  } catch (error) {
    throw error;
  }
};
const clearUserCart = async (userId) => {
  const userCartInfo = await getUserCartInfo(userId);
  const response = await baseURL.patch(`/userCart/${userCartInfo[0].id}`, {
    cartItems: [],
  });
  return response;
};
export {
  addProductToCart,
  getUserCartInfo,
  updateQuantity,
  deleteUserCartItem,
  clearUserCart,
};
