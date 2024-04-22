import React, { useEffect, useState } from 'react'
import Table from '../../../Components/Table/Table'
import Button from '../../../Components/Button/Button'
import { getUserOrders } from '../../../service/Requests/orders'
import WithAuth from '../../../HOC/WithAuth'
import './Orders.scss'
const Orders = ({ userInfo }) => {
  const [userOrders, setUserOrders] = useState([])
  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getUserOrders(userInfo.id)
        setUserOrders(response)
      } catch (error) {
        console.log(error);
      }
    }
    getOrders()
  }, [userInfo])

  return (
    <div className='ordersWrapper'>
      {
        userOrders.length != 0 ? (
          <Table>
            <thead>
              <tr className='orders-table-row'>
                <th data-label="سفارش">سفارش</th>
                <th data-label="تاریخ">تاریخ</th>
                <th data-label="وضعیت">وضعیت</th>
                <th data-label="جمع">جمع</th>
                <th data-label="اقدامات">اقدامات</th>
              </tr>
            </thead>
            <tbody>
              {userOrders &&
                userOrders.map(order => {
                  return <tr className='orders-table-row' key={order.id}>
                    <td data-label="سفارش : ">{order.id}</td>
                    <td data-label="تاریخ : " >{order.orderDate}</td>
                    <td data-label="وضعیت : ">تکمیل</td>
                    <td data-label="جمع : ">{order.totalPrice} تومان برای {order?.orders.length} آیتم</td>
                    <td>
                      <Button variant='outlined' to={`/profile/ordersDetail/${order.id}`} title='نمایش فاکتور' />
                    </td>
                  </tr>
                })
              }
            </tbody>
          </Table>
        )
          : (
            <div className='error-alert'>سفارشی وجود ندارد</div>
          )
      }
    </div>
  )
}

export default WithAuth(Orders)