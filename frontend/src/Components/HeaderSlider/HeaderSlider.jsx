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
                grabCursor={true}
                modules={[Pagination]}
            >
                <SwiperSlide>
                    <div className="slider-picture">
                        <img
                            sizes="(max-width: 1400px) 100vw, 1400px"
                            srcSet="
                              ./slider-1_o9q5ka_c_scale,w_200.jpg 200w,
                              ./slider-1_o9q5ka_c_scale,w_1030.jpg 1030w,
                              ./slider-1_o9q5ka_c_scale,w_1400.jpg 1400w"
                            src="./slider-1_o9q5ka_c_scale,w_1400.jpg"
                            alt="" />
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
                                <Button title="خرید کنید" to='/shop/سبزیجات' />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slider-picture">
                        <img
                            sizes="(max-width: 1400px) 100vw, 1400px"
                            srcSet="
                             ./slider-2_x5ofc1_c_scale,w_200.jpg 200w,
                             ./slider-2_x5ofc1_c_scale,w_1067.jpg 1067w,
                             ./slider-2_x5ofc1_c_scale,w_1400.jpg 1400w"
                            src="./slider-2_x5ofc1_c_scale,w_1400.jpg"
                            alt="" />
                        <div className="slider-text-wrapper">
                            <div className="text-sm">
                                <span>جدیدترین محصولات را بررسی کنید!</span>
                            </div>
                            <div className="slider-title">
                                <h1 className='active'>سیب زمینی </h1>
                                <h1>ارگانیک و ترد</h1>
                            </div>
                            <div className="text-row">
                                <span>شروع از 20هزار تومن</span>
                                <div className="slider-btn">
                                    <Button title="خرید کنید" to='/shop/سبزیجات' />
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