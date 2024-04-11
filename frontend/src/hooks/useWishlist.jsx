import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserWishlist } from "../Redux/slices/wishListSlice";
import { useNavigate } from 'react-router-dom';

const useWishlist = (productId) => {
    const [isProductLiked, setIsProductsLiked] = useState(false)
    const isUserLoggedin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    const userWishListItems = useSelector(state => state.wishList.wishlistItems)
    const addToWishListStatus = useSelector(state => state.wishList.status)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const addToWishlist = (productId, productName, price, productImage) => {
        if (isUserLoggedin) {
            dispatch(handleUserWishlist({ userId: userInfo.id, productId, productName, price, productCover: productImage[0] }))
            return
        }
        navigate('/register')
    }

    const updateProductLikeStatus = useCallback(() => {
        if (isUserLoggedin) {
            const isProductLiked = userWishListItems.some(item => {
                return item.productId == +productId
            })
            return isProductLiked ? setIsProductsLiked(true) : setIsProductsLiked(false)
        }
    }, [isUserLoggedin, userWishListItems, productId])

    useEffect(() => {
        updateProductLikeStatus()
    }, [isUserLoggedin, updateProductLikeStatus])

    return { isProductLiked, addToWishlist, addToWishListStatus }
}

export default useWishlist