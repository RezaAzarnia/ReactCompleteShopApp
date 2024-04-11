import React, { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination';
import './Slider.scss'
const Slider = ({ Array, Card, paginationMode, sizeInfoArray, spaceBetween = 10 }) => {

    const [slidesPerview, setSlidesPerview] = useState(1)

    useEffect(() => {
        const changeScreenSize = () => {
            const currentSize = sizeInfoArray.find(item => window.innerWidth < item.size);
            if (currentSize) {
                setSlidesPerview(currentSize.slidesPerview);
            }
        }
        changeScreenSize()
        window.addEventListener('resize', changeScreenSize)
        return () => {
            window.removeEventListener('resize', changeScreenSize)
        }
    }, [sizeInfoArray])

    return (
        <Swiper
            className='swiper-slider'
            slidesPerView={slidesPerview}
            spaceBetween={spaceBetween}
            grabCursor={true}
            pagination={paginationMode && { clickable: true }}
            modules={paginationMode && [Pagination]}
        >
            {
                Array.length > 0 &&
                Array.map((item, index) => {
                    return (
                        <SwiperSlide key={index + 1}>
                            <Card {...item} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default Slider