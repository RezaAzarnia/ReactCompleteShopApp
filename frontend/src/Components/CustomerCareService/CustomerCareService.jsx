import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiHeadsetLight } from "react-icons/pi";
import { CiCoinInsert } from "react-icons/ci";
import "swiper/css";
import './CustomerCareService.scss'
import Slider from '../Slider/Slider';

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
        <div className="careCardWrapper">
            <div className="care-card">
                <div className="card-logo">
                    {icon}
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <h3>{title}</h3>
                    </div>
                    <div className="card-description">
                        <span>{description}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

const CustomerCareService = () => {

    return (
        <div className="container">
            <div className="customerCareServiceWrapper ">
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