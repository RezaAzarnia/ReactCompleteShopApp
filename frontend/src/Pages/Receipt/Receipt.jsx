import React, { useEffect, useState } from 'react'
import { getOrderDetail } from '../../service/Requests/orders'
import { useNavigate, useParams } from 'react-router-dom'
import PageTitle from '../../Components/PageTitle/PageTitle'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import Table from '../../Components/Table/Table'
import OrderReceit from '../../Components/OrderReceit/OrderReceit'
import './Receipt.scss'
const Receipt = () => {
  const { orderId } = useParams()
  const [userOrderInfo, setUserOrderInfo] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        const response = await getOrderDetail(orderId)
        setUserOrderInfo(response);
      } catch (error) {
        console.log(error);
      }
    }
    getOrderInfo()
  }, [orderId])

  // return user to home page on back button
  useEffect(() => {
    window.addEventListener("popstate", () => navigate('/'));
  }, []);




  return (
    <div className="receiptWrapper">
      <PageTitle title="رسید خرید" />
      <div className="container">
        <BreadCrump activePage="رسید خرید" />
        {userOrderInfo?.orders &&
          <div className="receipt-container">
            <div className="alert">
              <h1>متشکرم.سفارش شما دریافت شد</h1>
            </div>

            <Table>
              <thead>
                <tr className='receipt-table-row'>
                  <th>شماره سفارش</th>
                  <th>وضعیت</th>
                  <th>تاریخ</th>
                  <th>جمع کل</th>
                  <th>روش پرداخت</th>
                </tr>
              </thead>
              <tbody>
                <tr className='receipt-table-row'>
                  <td data-label="شماره سفارش : ">{userOrderInfo?.id}</td>
                  <td data-label="وضعیت : ">تکمیل</td>
                  <td data-label="تاریخ : ">{userOrderInfo?.orderDate}</td>
                  <td data-label="جمع کل : ">{userOrderInfo?.totalPrice} تومان</td>
                  <td data-label="روش پرداخت :">{userOrderInfo?.paymentMode == 'cashMode' ? 'پرداخت هنگام دریافت' : 'انتقال مستقیم بانکی'}</td>
                </tr>
              </tbody>
            </Table>
            <OrderReceit orderInfo={userOrderInfo} />

          </div>
        }
      </div>

    </div>
  )
}

export default Receipt