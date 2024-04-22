import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import Rate from '../Rate/Rate'
import Slider from '../Slider/Slider'
import './CustomersFeedback.scss'

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
    const FeedbackCard = ({ name, feedback }) => {
        return (
            <div className="customers-feedback-card">
                <div className="customer-message-box">
                    <p className="customer-message">
                        {feedback}
                    </p>
                </div>
                <div className="customer-feedback-user-part">
                    <div className="customer-avatar">
                        <img src="./avatar.jpg" alt="" />
                    </div>
                    <div className="customer-info">
                        <Rate />
                        <span className="customer-name">
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='customers-feedback container'>
            <SectionHeader title="آنچه مشتریان ما می گویند" />
            <div className="customer-feedback-row">
                <Slider
                    Array={feedbackData}
                    Card={FeedbackCard}
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
    )
}

export default CustomersFeedback