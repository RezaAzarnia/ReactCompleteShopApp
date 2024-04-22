import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import ProtectRoute from "../Components/ProtectRoute/ProtectRoute";
const Layout = lazy(() => import('../Components/Layout/Layout'))
const Home = lazy(() => import('../Pages/Home/Home'))
const Shop = lazy(() => import('../Pages/Shop/Shop'))
const Cart = lazy(() => import('../Pages/Cart/Cart'))
const Register = lazy(() => import('../Pages/Register/Register'))
const WishList = lazy(() => import('../Pages/WishList/WishList'))
const Product = lazy(() => import('../Pages/Product/Product'))
const Checkout = lazy(() => import('../Pages/Checkout/Checkout'))
const ProfileLayout = lazy(() => import('../Components/ProfileLayout/ProfileLayout'))
const Receipt = lazy(() => import('../Pages/Receipt/Receipt'))
const ProfileIndex = lazy(() => import('../Pages/Profile/ProfileIndex/ProfileIndex'))
const Orders = lazy(() => import('../Pages/Profile/Orders/Orders'))
const UserAddress = lazy(() => import('../Pages/Profile/UserAddress/UserAddress'))
const UserOrderDetail = lazy(() => import('../Pages/Profile/UserOrderDetail/UserOrderDetail'))
const NotFound = lazy(() => import('../Pages/NotFound/NotFound'))

const routes = createBrowserRouter([
    {
        path: '',
        element:
            <Suspense fallback={<Loader />}>
                <Layout />
            </Suspense>,

        children: [
            { path: "/", element: <Home /> },
            { path: "/shop/:searchValue?", element: <Shop /> },
            { path: "/cart", element: <Cart /> },
            { path: "/wishlist", element: <WishList /> },
            { path: "/product/:productId", element: <Product /> },
            { path: "register", element: <Register /> },
            {
                path: "/checkout", element:
                    <ProtectRoute>
                        <Checkout />
                    </ProtectRoute>
            },
            {
                path: "/receipt/:orderId", element:
                    <ProtectRoute>
                        <Receipt />
                    </ProtectRoute>
            },
            {
                path: '/profile',
                element:
                    <ProtectRoute>
                        <ProfileLayout />
                    </ProtectRoute>,
                children: [
                    {

                        path: "",
                        element: <ProfileIndex />
                    },
                    {
                        path: "orders",
                        element: <Orders />
                    },
                    {
                        path: "ordersDetail/:orderId",
                        element: <UserOrderDetail />
                    },
                    {
                        path: "address",
                        element: <UserAddress />
                    },
                    {
                        path: "downloads",
                        element: <span className='error-alert'>این بخش در حال ساخت است</span>
                    },
                    {
                        path: "accountdetail",
                        element: <span className='error-alert'>این بخش در حال ساخت است</span>
                    }
                ]
            },
            { path: '*', element: <NotFound /> },

        ],

    },

])
export default routes;