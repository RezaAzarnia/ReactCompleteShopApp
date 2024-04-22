import React from 'react'
import { Link } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";
import './newArrivals.scss'
const NewArrivals = () => {
    return (
        <div className='container'>
            <div className="newArriavalsWrapper">
                <div className="newArrival-item">
                    <div className="newArrival-picture">
                        <img src="./meat.jpg" alt="" />
                    </div>
                    <div className="newArrivalText">
                        <h2 className='text-title'>گوشت تازه </h2>
                        <h2 className='text-primary'>شروع از 250تومان </h2>
                        <div className="text-row">
                            <Link to='shop/گوشت%20و%20ماهی'>
                                خریدکنید
                            </Link>
                            <GoArrowLeft />
                        </div>
                    </div>
                </div>
                <div className="newArrival-item">
                    <div className="newArrival-picture">
                        <img src="./bread.jpg" alt="" />
                    </div>
                    <div className="newArrivalText">
                        <h2 className='text-white'>نان جدید </h2>
                        <h2 className='text-white'>تا 25% تخفیف</h2>
                        <div className="text-row">
                            <Link to='/shop' className='text-white'>
                                خریدکنید
                            </Link>
                            <GoArrowLeft className='text-white' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals