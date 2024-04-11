import React from 'react'
import './OrderReceit.scss'


const OrderDetailRow = ({ label, value, labelBold, valueBold }) => {
    return <div className="order-detail-row">
        <span className={`order-text${labelBold ? '-bold' : ''}`}>{label}</span>
        <span className={`order-text${valueBold ? '-bold' : ''}`}>{value}</span>
    </div>
}


const OrderReceit = ({ orderInfo }) => {
   
    const { orders, totalPrice, customerInfos, paymentMode } = orderInfo;
    return (
        <>
            <div className="order-detail">
                <h2>مشخصات سفارش</h2>
                <div className="order-detail-box">
                    <OrderDetailRow
                        label="محصول"
                        value="مجموع"
                        labelBold
                        valueBold
                    />
                    <div className="border-line"></div>
                    <div className="orders">
                        {
                            orders?.map(item => {
                                return (
                                    <OrderDetailRow
                                        key={item.id}
                                        label={`${item.productName} × ${item.quantity}`}
                                        value={`${(item.price * item.quantity).toLocaleString('fa-IR')} تومان`}
                                    />
                                )
                            })
                        }
                        <OrderDetailRow
                            label="جمع کل سبد خرید : "
                            value={`${totalPrice} تومان`}
                            labelBold
                        />
                    </div>
                    <div className="border-line"></div>
                    <OrderDetailRow
                        label="حمل و نقل :"
                        value={` حمل و نقل رایگان به ${customerInfos?.state} - ${customerInfos?.city}`}
                        labelBold
                    />
                    <div className="border-line"></div>
                    <OrderDetailRow
                        label="روش پرداخت :"
                        value={paymentMode === 'cashMode' ? 'پرداخت هنگام دریافت' : 'انتقال مستقیم بانکی'}
                        labelBold
                    />
                    <div className="border-line"></div>
                    <OrderDetailRow
                        label="قیمت نهایی :"
                        value={`${totalPrice} تومان`}
                        labelBold
                        valueBold
                    />
                </div>
            </div>
            <div className="address-row">
                <div className="billing-address">
                    <h3>مشخصات پرداخت کننده</h3>
                    <div className="border-line"></div>
                    {
                        customerInfos &&
                        <ul className='address-list'>
                            <li className='address-list-item'>
                                {`${customerInfos.userName} ${customerInfos.famillyName}`}
                            </li>
                            <li className='address-list-item'>
                                {`${customerInfos.address}`}
                            </li>
                            <li className='address-list-item'>
                                {`${customerInfos.state} - ${customerInfos.city} -  ${customerInfos.postCode}`}
                            </li>
                            <li className='address-list-item'>
                                {`${customerInfos.userPhone}`}
                            </li>
                            <li className='address-list-item'>
                                {`${customerInfos.email}`}
                            </li>
                        </ul>
                    }
                </div>
                <div className="shipping-address">
                    <h3>آدرس تحویل</h3>
                    <div className="border-line"></div>
                    {
                        customerInfos &&
                        <ul className='address-list'>
                            <li className='address-list-item'>
                                {`${customerInfos.userName} ${customerInfos.famillyName}`}
                            </li>
                            <li className='address-list-item'>
                                {`${customerInfos.address}`}
                            </li>
                            <li className='address-list-item'>
                                {`${customerInfos.state} - ${customerInfos.city} -  ${customerInfos.postCode}`}
                            </li>
                            {customerInfos.orderExplain &&
                                <li className='address-list-item'>
                                    {`${customerInfos.orderExplain}`}
                                </li>
                            }
                        </ul>
                    }
                </div>
            </div >
        </>
    )
}

export default OrderReceit