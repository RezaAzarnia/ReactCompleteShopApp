import React, { useEffect, useState } from 'react'
import OrderReceit from '../../../Components/OrderReceit/OrderReceit'
import { useParams } from 'react-router-dom'
import { getOrderDetail } from '../../../service/Requests/orders'
import './UserOrderDetail.scss'
const UserOrderDetail = () => {
    const { orderId } = useParams()
    const [userOrderInfo, setUserOrderInfo] = useState({})
    const getOrderInfo = async () => {
        const response = await getOrderDetail(orderId)
        setUserOrderInfo(response);
    }
    useEffect(() => {
        getOrderInfo()
    }, [orderId])
    return (
        <div>
            <OrderReceit orderInfo={userOrderInfo} />
        </div>
    )
}

export default UserOrderDetail