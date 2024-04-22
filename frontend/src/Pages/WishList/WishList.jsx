import React, { useState } from 'react'
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
import './Wishlist.scss'
const WishList = ({ userInfo }) => {
    const userWishListItems = useSelector(state => state.wishList.wishlistItems)
    const { handleAddCart } = useAddCart()
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
                                <Table>
                                    <thead>
                                        <tr className='wishlist-table-row'>
                                            <th data-label="محصول">محصول</th>
                                            <th data-label="قیمت">قیمت</th>
                                            <th data-label="انبار">وضعیت انبار</th>
                                            <th data-label="محصول">اقدامات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userWishListItems.map(item => {
                                                return <WishListItem
                                                    key={item.productId}
                                                    item={item}
                                                    handleAdd={() => handleAddCart(item.productId, item.productName, item.price, item.productCover)}
                                                    handleDelete={() => handleDeleteLikedProduct({ userId: userInfo.id, productId: item.productId })}
                                                />
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </>
                            : <EmptyWishList />
                    }
                </div>
            </div>
        </div>
    )
}
const WishListItem = ({ item, handleAdd, handleDelete }) => {
    const dispatch = useDispatch()

    return <tr className='wishlist-table-row'>
        <td className='product-table-picture' >
            <div className="image-part">
                <button onClick={() => dispatch(handleDelete())}>
                    <IoMdClose />
                </button>
                <img src={item.productCover} alt="" />
            </div>
            <span>{item.productName} </span>
        </td>
        <td className='price' data-label='قیمت : '>
            {item.price.toLocaleString('fa-IR')} تومان
        </td>
        <td className='inStock' data-label="انبار : ">
            در انبار
        </td>
        <td>
            <Button title="مشاهده سریع" variant='outlined' />
            <Button title="اضافه کردن به سبد خرید"
                onClick={handleAdd}
            />
        </td>
    </tr>
}
const EmptyWishList = () => {
    return (<div className="empty-wishlist">
        <EmptyWishlistIcon />
        <p>لیست علاقه مندی ها خالی است</p>
    </div>)
}
export default withAuth(WishList)