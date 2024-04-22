import React, { useEffect, useState } from 'react'
import { getUserOrders } from '../../../service/Requests/orders'
import { Link } from 'react-router-dom'
import WithAuth from '../../../HOC/WithAuth'
import './UserAddress.scss'
const UserAddress = ({ userInfo }) => {
    const [customerAddressInfo, setCustomerAddressInfo] = useState({})
    const getUserAddressInfo = async () => {
        const response = await getUserOrders(userInfo.id)
        setCustomerAddressInfo(response.length > 0 && response.slice(0, 1)[0].customerInfos)
    }
    useEffect(() => {
        getUserAddressInfo()
    }, [userInfo])
    return (
        <div className="address-row">
            {
                customerAddressInfo ? (
                    <>
                        <div className="billing-address">
                            <h3>مشخصات پرداخت کننده</h3>
                            <div className="border-line"></div>
                            {
                                <ul className='address-list'>
                                    <li className='address-list-item'>
                                        نام : {`${customerAddressInfo.userName} ${customerAddressInfo.famillyName}`}
                                    </li>
                                    <li className='address-list-item'>
                                        آدرس :  {`${customerAddressInfo.address}`}
                                    </li>
                                    <li className='address-list-item'>
                                        شهر :   {`${customerAddressInfo.state} - ${customerAddressInfo.city}`}
                                    </li>
                                    <li className='address-list-item'>
                                        کشور :  ایران
                                    </li>
                                    <li className='address-list-item'>
                                        کد پستی :   {` ${customerAddressInfo.postCode}`}
                                    </li>
                                    <li className='address-list-item'>
                                        شماره تلفن :  {`${customerAddressInfo.userPhone}`}
                                    </li>
                                </ul>
                            }
                            <div className="edit-address">
                                <Link to='/profile' className='edit-address-link'> ویرایش آدرس پرداخت </Link>
                            </div>
                        </div>
                        <div className="shipping-address">
                            <h3>آدرس تحویل</h3>
                            <div className="border-line"></div>
                            {
                                <ul className='address-list'>
                                    <li className='address-list-item'>
                                        نام :  {`${customerAddressInfo.userName} ${customerAddressInfo.famillyName}`}
                                    </li>
                                    <li className='address-list-item'>
                                        آدرس :   {`${customerAddressInfo.address}`}
                                    </li>
                                    <li className='address-list-item'>
                                        شهر :   {`${customerAddressInfo.state} - ${customerAddressInfo.city}`}
                                    </li>
                                    <li className='address-list-item'>
                                        کشور :  ایران
                                    </li>
                                    <li className='address-list-item'>
                                        کد پستی :   {` ${customerAddressInfo.postCode}`}
                                    </li>
                                </ul>
                            }
                            <div className="edit-address">
                                <Link to='/profile' className='edit-address-link'> ویرایش آدرس تحویل</Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <span className='error-alert'>آدرسی ثبت نشده است</span>
                )
            }

        </div >
    )
}

export default WithAuth(UserAddress)