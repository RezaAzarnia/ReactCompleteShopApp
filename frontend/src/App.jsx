import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from './Redux/slices/productsSlice'
import { clearWishlist, getWishListItems } from './Redux/slices/wishListSlice'
import { clearCart, getUserCart } from './Redux/slices/cartSlice'
import routes from './routes/routes'
import './App.scss'

function App() {
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(getWishListItems(userInfo.id))
      dispatch(getUserCart(userInfo.id))
    } else {
      dispatch(clearCart())
      dispatch(clearWishlist())

    }
  }, [userInfo])

  return (
    <>
      <ToastContainer rtl />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
