import { baseURL } from "../Configs/configs";

const getUserWishListInfo = async (userId) => {
  const userWishList = await baseURL.get(`/wishlist?userId=${userId}`);
  const userWishListValues = userWishList.data;

  return userWishListValues;
};

const getUserWishList = async (userId) => {
  const res = await baseURL.get(`/wishlist?userId=${userId}&_expand=user`);
  if (res.data.length > 0) {
    return res.data[0].wishListItems.reverse();
  } else {
    return [];
  }
};

const wishListUpdater = async (oldItems, newData) => {
  const id = oldItems.id;
  const updatedWishList = [...oldItems.wishListItems, newData];

  const response = await baseURL.patch(`/wishlist/${id}`, {
    wishListItems: updatedWishList,
  });
  return response.data.wishListItems.reverse();
};

const wishListCreator = async (mainInfos, newData) => {
  const response = await baseURL.post("/wishlist", {
    userId: mainInfos.userId,
    wishListItems: [newData],
  });
  return response.data.wishListItems.reverse();
};

const addToWishList = async (mainInfos) => {
  const { userId, ...newData } = mainInfos;
  const userWishListInfo = await getUserWishListInfo(mainInfos.userId);

  if (userWishListInfo.length > 0) {
    const response = await wishListUpdater(userWishListInfo[0], newData);
    return response;
  } else {
    const response = await wishListCreator(mainInfos, newData);
    return response;
  }
  
};

const deleteUserLikedItem = async (userId, productId) => {
  const userWishList = await getUserWishListInfo(userId);

  const filteredWishList = userWishList[0].wishListItems.filter((product) => {
    return product.productId != productId;
  });

  const updatedItems = await baseURL.put(`/wishlist/${userWishList[0].id}`, {
    userId: userId,
    wishListItems: filteredWishList,
  });

  return updatedItems.data.wishListItems.reverse();
};
export { addToWishList, getUserWishList, deleteUserLikedItem };
