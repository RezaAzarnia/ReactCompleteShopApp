import React from 'react'
import { Link } from 'react-router-dom';
import { PiShoppingCart } from "react-icons/pi";
import { useSelector } from 'react-redux'
import { selectCartTotalPrice, selectUserCartLength } from '../../Redux/slices/cartSlice'
import QuantityModifier from '../QuantityModifier/QuantityModifier'
import Button from '../Button/Button'
import './CartDropdown.scss'
const CartDropdown = () => {
    const cartLength = useSelector(selectUserCartLength)
    const cartItems = useSelector(state => state.cart.userCart)
    const cartTotalPrice = useSelector(selectCartTotalPrice)

    return (
        <div className='cartWrapper'>
            <>
                {
                    cartLength > 0 ? (
                        <div className='cart-items-row'>
                            <div className="card-header-wrapper">
                                <div className="cart-header">
                                    <span>{cartLength} کالا</span>
                                </div>
                            </div>
                            <div className="cart-list">
                                {
                                    cartItems?.map(item => {
                                        return <div className="cart-item" key={item.id}>
                                            <div className="cart-row">
                                                <div className="cart-picture">
                                                    <img src={item.productCover} alt="" />
                                                </div>
                                                <div className="cart-product-title">
                                                    <h3>{item.productName}</h3>
                                                    <div className="cart-product-price">
                                                        <h3>{item.price.toLocaleString('fa-IR')}</h3>
                                                    </div>
                                                </div>
                                                <QuantityModifier quantity={item.quantity} productId={item.id} />
                                            </div>
                                        </div>
                                    })
                                }
                                <div className="border-line"></div>
                            </div>
                            <div className="cart-totalPrice">
                                <div className="total-price">
                                    <p>مبلغ قابل پرداخت</p>
                                    <p>{cartTotalPrice} تومان</p>
                                </div>
                            </div>
                            <div className="submit-cart">
                                <Button to="/cart" title="مشاهده سبد خرید" variant='outlined' />
                                <Button to="/cart" title="ثبت سفارش" />
                            </div>
                        </div>
                    ) : <div className="cart-empty-alert">
                        <div className="cart-empty-row">
                            <div className="shop-icon">
                                <PiShoppingCart />
                            </div>
                            <div className="cart-empty-text">
                                <p>!card is empty</p>
                                <Link to='/shop'>به خرید ادامه دهید</Link>
                            </div>
                        </div>
                    </div>
                }
            </>
        </div>
    )
}

export default CartDropdown