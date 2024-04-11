import React from 'react'
import Button from '../Button/Button'
import './CheckoutSummary.scss'
const CheckoutSummary = ({ cartItem, totalPrice, setPaymentMode, paymentMode, onClick ,isLoading}) => {
    return (
        <div className="checkout-information-sidebar">
            <div className="checkout-card-title">
                <h3>سفارش شما</h3>
            </div>
            <div className="checkout-items">
                <ul className="checkout-buy-list">
                    <li className='checkout-buy-list-item checkout-row '>
                        <span className='buylist-title'>محصول </span>
                        <span className='buylist-title'>جمع جز</span>
                    </li>
                    {cartItem.map(item => {
                        return (
                            <li className='checkout-buy-list-item checkout-row' key={item.id}>
                                <span className='buy-list-items'>{`${item.productName} × ${item.quantity}`}</span>
                                <span className='buy-list-items'>{(item.price * item.quantity).toLocaleString('fa-IR')} هزار تومن</span>
                            </li>

                        )
                    })}
                </ul>
            </div>
            <div className="border-line"></div>
            <div className="checkout-total-price">
                <div className="total-price-row checkout-row ">
                    <span>جمع جز</span>
                    <span>{totalPrice}</span>
                </div>
            </div>
            <div className="border-line"></div>
            <div className="checkout-shipping-payment">
                <p className='ship-text'>حمل</p>
                <p className='ship-free'>حمل و نقل رایگان</p>
            </div>
            <div className="border-line"></div>
            <div className="checkout-total-price">
                <div className="total-price-row checkout-row ">
                    <span>جمع کل</span>
                    <span style={{ fontSize: "20px" }}>{totalPrice} تومان</span>
                </div>
            </div>
            <div className="border-line"></div>
            <div className="checkout-payment-way">
                <h3>روش های پرداخت</h3>
                <div className="payment-methods">
                    <div className="creadit-card-method">
                        <div className='input-radio-row'>
                            <label htmlFor="credit-checked">انتقال مستقیم بانکی</label>
                            <input
                                type="radio"
                                name="onlineMode"
                                id="credit-checked"
                                checked={paymentMode == "onlineMode"}
                                onChange={(e) =>
                                    setPaymentMode(e.target.name)
                                } />

                        </div>
                        <div className={`payment-collapse ${paymentMode == "onlineMode" ? 'show' : ''}`}  >
                            <p className={`payment-info`}>
                                پرداخت خود را مستقیما به حساب بانکی ما واریز کنید.خواهشمندیم شماره سفارش خود را بعنوان کد ارجاع پرداخت استفاده کنید.سفارش شما تا زمانی که وجوه به حساب ما وارد نشود ارسال نخواهد شد.
                            </p>
                        </div>
                    </div>
                    <div className="cash-method" >
                        <div className='input-radio-row'>
                            <label htmlFor="cash-checked"> پرداخت هنگام دریافت</label>
                            <input type="radio"
                                name="cashMode"
                                id="cash-checked"
                                checked={paymentMode == "cashMode"}
                                onChange={(e) =>
                                    setPaymentMode(e.target.name)
                                }
                            />
                        </div>
                        <div className={`payment-collapse ${paymentMode == "cashMode" ? 'show' : ''}`} >
                            <p className="payment-info">
                                پرداخت نقدی پس از تحویل
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-line"></div>
            <div className="submit-checkout">
                <div className="check-website-rules">
                    <input type="checkbox" id='checkout-rules-checkbox' defaultChecked required />
                    <label htmlFor="checkout-rules-checkbox">
                        تمامی قوانین سایت را میپذیرم
                    </label>
                </div>
                <Button title="ثبت سفارش" onClick={onClick}  isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default CheckoutSummary