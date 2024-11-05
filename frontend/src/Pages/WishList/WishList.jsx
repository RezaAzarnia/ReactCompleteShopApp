import React, { useEffect, useState } from 'react'
import PageTitle from '../../Components/PageTitle/PageTitle';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import Button from '../../Components/Button/Button';
import Table from '../../Components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteLikedProduct } from '../../Redux/slices/wishListSlice'
import { IoMdClose } from "react-icons/io";
import withAuth from '../../HOC/WithAuth'
import useAddCart from '../../hooks/useAddCart';
import EmptyWishlistIcon from '../../Icons/EmptyWishlistIcon';
import './WishList.scss'
const WishList = ({ userInfo }) => {
    const userWishListItems = useSelector(state => state.wishList.wishlistItems)
    const { handleAddCart, addToCartStatus } = useAddCart()
    const dispatch = useDispatch()
    return (
        <div className='wishlistWrapper'>
            <PageTitle title="لیست علاقه مندی ها" />
            <div className="container">
                <BreadCrump activePage="علاقه مندی ها" />
                <div className="wishlistTabel">
                    {
                        userWishListItems.length > 0 ?
                            <>
                                <div className="wishlistTitle">
                                    <h3>لیست علاقه مندی ها</h3>
                                </div>
                                <Table
                                    headerItems={["محصول", "قیمت", "انبار", "اقدامات"]}
                                    tableRowClassName={"wishlist-table-row"}
                                    data={userWishListItems}
                                    render={(product) => {
                                        return (
                                            <tr className='wishlist-table-row' key={product.productId}>
                                                <td className='product-table-picture' >
                                                    <div className="image-part">
                                                        <button onClick={() => dispatch(handleDeleteLikedProduct({ userId: userInfo.id, productId: product.productId, }))}>
                                                            <IoMdClose />
                                                        </button>
                                                        <img src={product.productCover} alt="" />
                                                    </div>
                                                    <span>{product.productName} </span>
                                                </td>
                                                <td className='price' data-label='قیمت : '>
                                                    {product.price.toLocaleString('fa-IR')} تومان
                                                </td>
                                                <td className='inStock' data-label="انبار : ">
                                                    در انبار
                                                </td>
                                                <td>
                                                    <Button title="مشاهده سریع" variant='outlined' />
                                                    <Button title="اضافه کردن به سبد خرید" onClick={() => handleAddCart(product)}
                                                        isLoading={addToCartStatus == 'loading' && true}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }}
                                />
                            </>
                            : <div className="empty-wishlist">
                                <EmptyWishlistIcon />
                                <p>لیست علاقه مندی ها خالی است</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
// const WishListItem = ({ item, status, handleAdd, handleDelete }) => {
//     const dispatch = useDispatch()
//     const [isShowLoader, setIsShowLoader] = useState(false)

//     useEffect(() => {
//         status !== "loading" && setIsShowLoader(false)
//     }, [status])
//     return <tr className='wishlist-table-row'>
//         <td className='product-table-picture' >
//             <div className="image-part">
//                 <button onClick={() => dispatch(handleDelete())}>
//                     <IoMdClose />
//                 </button>
//                 <img src={item.productCover} alt="" />
//             </div>
//             <span>{item.productName} </span>
//         </td>
//         <td className='price' data-label='قیمت : '>
//             {item.price.toLocaleString('fa-IR')} تومان
//         </td>
//         <td className='inStock' data-label="انبار : ">
//             در انبار
//         </td>
//         <td>
//             <Button title="مشاهده سریع" variant='outlined' />
//             <Button title="اضافه کردن به سبد خرید"
//                 onClick={() => {
//                     handleAdd()
//                     setIsShowLoader(true)
//                 }}
//                 isLoading={isShowLoader && status == 'loading' ? true : false}
//             />
//         </td>
//     </tr>
// }

export default withAuth(WishList)