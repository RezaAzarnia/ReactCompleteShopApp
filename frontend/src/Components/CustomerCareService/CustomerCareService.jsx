import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiHeadsetLight } from "react-icons/pi";
import { CiCoinInsert } from "react-icons/ci";
import Slider from '../Slider/Slider';
import "swiper/css";
import './CustomerCareService.scss'


const CustomerCareService = () => {
    const careInfos = [
        {
            id: 1,
            icon: <LiaShippingFastSolid />,
            title: "ارسال رایگان",
            description: "ارسال رایگان برای سفارش های بالا"
        },
        {
            id: 2,
            icon: <PiHeadsetLight />,
            title: "پشتیبانی مشتری",
            description: "دسترسی فوری به پشتیبانی کامل"
        },
        {
            id: 3,
            icon: <CiCoinInsert />,
            title: "پرداخت ایمن",
            description: " ما پرداخت ایمن را تامین میکنیم!"
        },
    ]
    const CustomerCareCard = ({ icon, title, description }) => {
        return (
            <div className="care-card-wrapper">
                <div className="care-card">
                    <div className="card-logo">
                        {icon}
                    </div>
                    <div className="card-body">
                        <h3 className='card-title'>{title}</h3>
                        <span className='card-description'>{description}</span>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="container">
            <div className="customer-care-service-wrapper">
                <div className="customer-cards-row">
                    <Slider
                        Array={careInfos}
                        Card={CustomerCareCard}
                        sizeInfoArray={[
                            { size: 600, slidesPerview: 1 },
                            { size: 990, slidesPerview: 2 },
                            { size: 4000, slidesPerview: 3 }
                        ]}
                    />
                </div>
            </div>
        </div >
    )
}


export default CustomerCareService