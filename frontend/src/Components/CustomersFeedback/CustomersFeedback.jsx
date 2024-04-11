import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import Rate from '../Rate/Rate'
import Slider from '../Slider/Slider'
import './CustomersFeedback.scss'

const CustomerFeedbackCard = ({ name, feedback }) => {
    return (
        <div className="CustomersFeedbackCard">
            <div className="customer-message-box">
                <div className="customer-message">
                    <p>
                        {feedback}
                    </p>
                </div>
            </div>
            <div className="customerFeedback-user-part">
                <div className="customer-avatar">
                    <img src="./avatar.jpg" alt="" />
                </div>
                <div className="customer-info">
                    <Rate />
                    <div className="customer-name">
                        <span>{name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
const CustomersFeedback = () => {
    const feedbackData = [
        {
            name: "محمد علی",
            feedback: "سرانجام فرصتی برای شما پیش آمده است تا متن خود را ویرایش و اصلاح کنید."
        },
        {
            name: "زهرا احمدی",
            feedback: "سرانجام فرصتی برای شما پیش آمده است تا متن خود را ویرایش و اصلاح کنید."
        },
        {
            name: "علی رضایی",
            feedback: "در این سایت می‌توانید به آسانی متن خود را تغییر دهید و نتیجه را ببینید."
        }
    ];
    return (
        <div className='customersFeedback'>
            <div className="container">
                <SectionHeader title="آنچه مشتریان ما می گویند" />
                <div className="customer-feedback-row">
                    <Slider
                        Array={feedbackData}
                        Card={CustomerFeedbackCard}
                        spaceBetween={20}
                        sizeInfoArray={[
                            { size: 600, slidesPerview: 1 },
                            { size: 990, slidesPerview: 2 },
                            { size: 4000, slidesPerview: 3 }
                        ]}
                        paginationMode
                    />

                </div>
            </div>
        </div>
    )
}

export default CustomersFeedback