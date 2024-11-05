import React from 'react'
import { useSelector } from 'react-redux';
import PageTitle from '../../Components/PageTitle/PageTitle'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Table from '../../Components/Table/Table';
import CartSummary from '../../Components/CartSummary/CartSummary';
import QuantityModifier from '../../Components/QuantityModifier/QuantityModifier';
import EmptyCartIcon from '../../Icons/EmptyCartIcon';
import './Cart.scss'

const Cart = () => {
    const userCart = useSelector(state => state.cart.userCart)
    return (
        <>
            <PageTitle title="سبد خرید" />
            <div className="container">
                <BreadCrump activePage="سبد خرید" />
                {
                    userCart.length > 0 ? (
                        <div className="cart-table-row">
                            <div className="user-cart-products">
                                <Table
                                    headerItems={["محصول", "قیمت", "مقدار", "جمع جزء"]}
                                    tableRowClassName={"tablerow"}
                                    data={userCart}
                                    render={(item) => {
                                        return (
                                            <tr className='tablerow'>
                                                <td className='product-table-picture'>
                                                    <img src={item.productCover} alt="" />
                                                    <span>{item.productName}</span>
                                                </td>
                                                <td className='price'>
                                                    {item?.price.toLocaleString('fa-IR')} تومان
                                                </td>
                                                <td>
                                                    <QuantityModifier quantity={item.quantity} productId={item.productId} />
                                                </td>
                                                <td>
                                                    {(item.price * item.quantity).toLocaleString('fa-IR')}تومان
                                                </td>
                                            </tr>
                                        )
                                    }}
                                />

                            </div>
                            <CartSummary />
                        </div>
                    )
                        : (
                            <div className="cart-empty">
                                <EmptyCartIcon />
                                <p>سبد خرید خالی است</p>
                            </div>
                        )
                }
            </div>

        </>
    )
}

export default Cart