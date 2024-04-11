import React from 'react'
import Button from '../Button/Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeaderSlider.scss'

const HeaderSlider = () => {
    return (
        <div className='headerSliderContainer'>
            <Swiper
                className='mySwiper'
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >
                <SwiperSlide>
                    <div className="slider-picture">
                        <img src="../public/slider-1.jpg" alt="header slider" />
                        <div className="slider-text-wrapper">
                            <div className="text-sm">
                                <span>به فروشگاه خوش آمدید!</span>
                            </div>
                            <div className="slider-title">
                                <h1>تمامی سبزیجات تازه</h1>
                                <h1>
                                    از 30000 تومان
                                </h1>
                            </div>
                            <div className="slider-btn">
                                <Button title="خرید کنید" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slider-picture">
                        <img src="../public/slider-2.jpg" alt="header slider" />
                        <div className="slider-text-wrapper">
                            <div className="text-sm">
                                <span>جدیدترین محصولات را بررسی کنید!</span>
                            </div>
                            <div className="slider-title">
                                <h1 className='active'>سیب زمینی </h1>
                                <h1>ارگانیک و ترد</h1>
                            </div>
                            <div className="row">
                                <span>شروع از 20هزار تومن</span>
                                <div className="slider-btn">
                                    <Button title="خرید کنید" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    )
}

export default HeaderSlider