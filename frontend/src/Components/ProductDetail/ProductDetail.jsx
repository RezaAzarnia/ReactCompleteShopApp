import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rate from '../Rate/Rate'
import QuantityModifier from '../../Components/QuantityModifier/QuantityModifier';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { BsBag, BsHeartFill } from 'react-icons/bs';
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { FaTwitter, FaPinterestP, FaRegHeart } from 'react-icons/fa6';
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import useWishlist from '../../hooks/useWishlist';
import useAddCart from '../../hooks/useAddCart';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './ProductDetail.scss'

const ProductDetail = ({ slideMode, id: productId, productName, productImage, description, price, category, rate }) => {
    const [productQuantity, setProductQuantity] = useState(0)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [productIndex, setProductIndex] = useState(0)
    const [slideProduct, setSlideProduct] = useState(null)
    const [isShowNextSlide, setIsShowNextSlide] = useState(false)
    const [isShowPrevSlide, setIsShowPrevSlide] = useState(false)
    const [isDisableNextIcon, setIsDisableNextIcon] = useState(false)
    const [isDisablePrevIcon, setIsDisablePrevIcon] = useState(false)

    const products = useSelector(state => state.products.products)
    const cartItems = useSelector(state => state.cart.userCart)

    const { handleAddCart, isProductInCart, addToCartStatus } = useAddCart(productId)
    const { isProductLiked, addToWishlist } = useWishlist(productId)

    //handle the slider
    const findProductIndex = useCallback(() => {
        const productIndex = products.findIndex(product => product.id == productId)
        setProductIndex(productIndex)

        products.length - 1 <= productIndex ? setIsDisableNextIcon(false) : setIsDisableNextIcon(true);
        productIndex == 0 ? setIsDisablePrevIcon(false) : setIsDisablePrevIcon(true)

    }, [productId, products])

    //show slide handlere
    const showSlide = useCallback((mode) => {
        findProductIndex()
        if (mode === 'next' && productIndex < products.length - 1) {
            setProductIndex(prev => {
                setSlideProduct(products[prev + 1])
                return prev
            })
            setIsShowNextSlide(true)
        } else if (mode === 'prev' && productIndex > 0) {
            setProductIndex(prev => {
                setSlideProduct(products[prev - 1])
                return prev
            })
            setIsShowPrevSlide(true)
        }
    }, [productIndex, products, findProductIndex])

    useEffect(() => {
        findProductIndex()
    }, [productId])

    //handle the product in cart 
    useEffect(() => {
        if (isProductInCart) {
            const cartItem = cartItems.find(item => item.id == productId)
            cartItem && setProductQuantity(cartItem.quantity)
        }
    }, [isProductInCart, cartItems]);



    //generate simple random number for the product id
    const generateProductId = useMemo(() => {
        return String(Math.floor(Math.random() * 124578245))
    }, [productId])

    return (
        <div className="container product-detail-wrapper">
            <div className="product-detail-row">
                <div className="product-picture">
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper3"
                    >
                        {
                            productImage?.map((item, index) => {
                                return <SwiperSlide key={index + 1} >
                                    <img src={item} alt="" />
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper4"
                    >
                        {
                            productImage?.map((item, index) => {
                                return <SwiperSlide key={index + 1}> <img src={item} alt="" /></SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
                <div className="product-infos">
                    <div className="product-row">
                        <h1 className='text-bold'>{productName}</h1>
                        {
                            slideMode && (
                                <div className="slider-arrows text-gray">
                                    <div className="next-product-container" >
                                        <div className="next-arrow" onMouseEnter={() => showSlide('next')} onMouseLeave={() => setIsShowNextSlide(false)} >
                                            <Link to={`/product/${slideProduct?.id}`}>
                                                <button disabled={!isDisableNextIcon}  >
                                                    <MdArrowForwardIos />
                                                </button>
                                            </Link>
                                            {isShowNextSlide && <SliderProductPreview {...slideProduct} />}
                                        </div>
                                    </div>

                                    <div className="prev-product-container">
                                        <div className="prev-arrow" onMouseEnter={() => showSlide('prev')} onMouseLeave={() => setIsShowPrevSlide(false)}>
                                            <Link to={`/product/${slideProduct?.id}`}>
                                                <button disabled={!isDisablePrevIcon} >
                                                    <MdArrowBackIos />
                                                </button>
                                            </Link>
                                            {isShowPrevSlide && <SliderProductPreview {...slideProduct} />}
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                    <div className="border-line"></div>
                    <div className="product-row">
                        <h1 className='text-bold'>{price?.toLocaleString('fa-IR')} تومان</h1>
                        <div className="product-rate">
                            <Rate rateCount={rate} />
                        </div>
                    </div>
                    <div className="product-description">
                        <p>{description}</p>
                    </div>
                    <div className="product-actions">
                        {
                            isProductLiked ?
                                <div className="action-row add-wishlist">
                                    <BsHeartFill className='heart-icon filled' />
                                    <Link to='/wishlist'>
                                        <h3>مشاهده علاقه مندی ها</h3>
                                    </Link>
                                </div>
                                :
                                <div className="action-row add-wishlist" onClick={() => addToWishlist(productId, productName, price, productImage)}>
                                    <FaRegHeart className='heart-icon' />
                                    <h3>اضافه کردن به علاقه مندی ها</h3>
                                </div>
                        }
                        <div className="action-row">
                            <LiaBalanceScaleSolid className='compare-icon' />
                            مقایسه
                        </div>
                    </div>
                    {
                        isProductInCart ? (
                            <div className="in-Cart">
                                <QuantityModifier quantity={productQuantity} productId={productId} />
                                <div className="see-cart">
                                    <p>در سبد شما</p>
                                    <p>
                                        {"مشاهده  "}
                                        <Link to='/cart'>سبد خرید</Link>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="add-to-cart">
                                <button className='addCartButton'
                                    disabled={addToCartStatus == 'loading'}
                                    onClick={() => handleAddCart(+productId, productName, price, productImage)}>
                                    {
                                        addToCartStatus == 'loading' ? <div className="button-loader"></div> : <>
                                            <BsBag className='bag-icon' />
                                            افزودن به سبد خرید
                                        </>
                                    }
                                </button>
                            </div>
                        )
                    }
                    <div className="border-line"></div>
                    <div className="category-info">
                        <div className="category-row">
                            <span>دسته ها : </span>
                            <span className='text-gray'>{category}</span>
                        </div>
                        <div className="category-row">
                            <span>شناسه : </span>
                            <span className='text-gray'>{generateProductId}</span>
                        </div>
                        <div className="category-row social-apps">
                            <span>اشتراک گذاری : </span>
                            <div className="share-row text-gray">
                                <TiSocialFacebook />
                                <FaTwitter />
                                <FaPinterestP />
                                <TiSocialLinkedin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const SliderProductPreview = ({ id, productImage, productName }) => {
    return (
        <div className={`product-preview`}>
            <div className="preview-image">
                <Link to={`/product/${id}`}>
                    <img src={productImage[0]} alt="" />
                </Link>
            </div>
            <div className="preview-productName">
                <span>{productName}</span>
            </div>
        </div>
    )
}
export default ProductDetail