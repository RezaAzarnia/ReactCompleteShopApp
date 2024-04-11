import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

const useAddCart = (productId) => {
    const disPatch = useDispatch()
    const isUserLogin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    const addToCartStatus = useSelector(state => state.cart.status)
    const userCart = useSelector(state => state.cart.userCart)
    const isUserLoggedin = useSelector(state => state.user.isLogin)

    const [isProductInCart, setIsProductInCart] = useState(false)
    const navigate = useNavigate()


    const handleAddCart = useCallback((productId, productName, price, productImage) => {
        const productCover = Array.isArray(productImage) ? productImage[0] : productImage;
        const productInfo = { id: productId, productName, price, productCover }
        if (isUserLogin) {
            disPatch(addToCart({ userId: userInfo.id, productInfo }))
        } else {
            navigate('/register')
        }
    }, [isUserLogin, disPatch, navigate, userInfo])

    const updateProducStatus = useCallback(() => {
        if (isUserLoggedin) {
            const isProductInCart1 = userCart.some(item => {
                return item.id == +productId
            })
            return isProductInCart1 ? setIsProductInCart(true) : setIsProductInCart(false)
        }
    }, [isUserLoggedin, productId, userCart])

    useEffect(() => {
        updateProducStatus()
    }, [userCart, isUserLoggedin, updateProducStatus])


    return { handleAddCart, isProductInCart, addToCartStatus };
}

export default useAddCart;
