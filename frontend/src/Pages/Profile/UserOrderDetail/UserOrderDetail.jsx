import React, { useEffect, useState } from 'react'
import OrderReceit from '../../../Components/OrderReceit/OrderReceit'
import { useParams } from 'react-router-dom'
import { getOrderDetail } from '../../../service/Requests/orders'
import './UserOrderDetail.scss'
const UserOrderDetail = () => {
    const { orderId } = useParams()
    const [userOrderInfo, setUserOrderInfo] = useState({})
    const [error, setError] = useState('')
    const getOrderInfo = async () => {
        try {
            const response = await getOrderDetail(orderId)
            setUserOrderInfo(response);
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        getOrderInfo()
    }, [orderId])

    if (error) {
        return <div className="container">
            <div className="error-alert">{error}</div>
        </div>
    }
    return (
        <div>
            <OrderReceit orderInfo={userOrderInfo} />
        </div>
    )
}

export default UserOrderDetail