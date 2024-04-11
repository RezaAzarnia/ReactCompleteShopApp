import React from 'react'
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
    const dispatch = useDispatch()
    return (
        <div className='wishlistWrapper'>
            <PageTitle title="لیست علاقه مندی ها" />
            <div className="container">
                <BreadCrump activePage="علاقه مندی ها" />
                {
                    <div className="wishlistContainer">
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
                                                        return <tr key={item.productId} className='wishlist-table-row'>
                                                            <td className='product-table-picture' >
                                                                <div className="image-part">
                                                                    <button onClick={() => dispatch(handleDeleteLikedProduct({ userId: userInfo.id, productId: item.productId }))}>
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
                                                                    onClick={() => handleAddCart(item.productId, item.productName, item.price, item.productCover)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </>
                                    : (
                                        <div className="empty-wishlist">
                                            <EmptyWishlistIcon />
                                            <p>لیست علاقه مندی ها خالی است</p>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default withAuth(WishList)