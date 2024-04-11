import React, { useEffect, useState } from 'react'
import PageTitle from '../../Components/PageTitle/PageTitle'
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import Loader from '../../Components/Loader/Loader'
import ProductCard from '../../Components/ProductCard/ProductCard'
import ProductDetail from '../../Components/ProductDetail/ProductDetail';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductInfo } from '../../Redux/slices/productsSlice'
import Slider from '../../Components/Slider/Slider'
import './product.scss';

const Product = () => {

    const dispatch = useDispatch()
    const { productId } = useParams()
    const error = useSelector(state => state.products.error)
    const isLoading = useSelector(state => state.products.loading)
    const productInfo = useSelector(state => state.products.productInfo[0])
    const products = useSelector(state => state.products.products)
    const [sameCategory, setSameCategory] = useState([])
    const ingredients = [
        {
            title: 'مواد : ',
            info: 'لورم ایپسوم متن ساختگی است.'
        },
        {
            title: 'اندازه : ',
            info: 'کوچک و بزرگ'
        },
        {
            title: 'استفاده پیشنهادی : ',
            info: 'لورم ایپسوم متن ساختگی است.'
        },
        {
            title: 'سازدنده : ',
            info: 'لورم ایپسوم متن ساختگی است.'
        }
    ];
    const deliveryInfos = [
        {
            topPart: 'ارسال رایگان برای سفارش های بالای 100 تومان',
            downPart: 'ارسال رایگان و ضمانت عودت محصول'
        },
        {
            topPart: 'دسترسی فوری به پشتیبانی کامل',
            downPart: 'پشتیبانی مشتری 24/7'
        },
        {
            topPart: 'ما پرداخت مطمئن را تضمین می کنیم!',
            downPart: 'پرداخت 100% مطمئن'
        }
    ]
    useEffect(() => {
        dispatch(fetchProductInfo(productId))
    }, [productId])

    useEffect(() => {
        const filter = products.filter(item => item.category === productInfo?.category)
        setSameCategory(filter.slice(0, 4))
        
    }, [productInfo])

    if (error) {
        return <h1 className='alert'>{error}</h1>
    }

    return (
        <>
            {
                isLoading == 'loading' && (
                    <div className="loader-overlay">
                        <Loader />
                    </div>
                )
            }
            <div className='productWrapper'>
                <PageTitle title="جزییات محصول" />
                <div className="container">
                    <BreadCrump activePage={productInfo?.productName} />
                    <ProductDetail {...productInfo} slideMode={true} />
                </div>
            </div>
            <div className="container">
                <div className="product-detail-tabpane">
                    <div className="product-detail-tabpane-menu">
                        <ul className='product-detail-tabpane-menu-list'>
                            <li className='product-detail-tabpane-list-item active'>
                                توضیحات
                            </li>
                            <li className='product-detail-tabpane-list-item deactive'>
                                نظرات مشتریان (1)
                            </li>
                        </ul>
                        <div className="border-line"></div>
                    </div>
                </div>
                <div className="product-extra-details-row">
                    <div className="right-side">
                        <div className="product-infos">
                            <h1 className='extra-description-title'>
                                توضیحات
                            </h1>
                            <p className='product-detail-text'>{productInfo?.description}</p>
                        </div>
                        <div className="product-ingradiant-infos">
                            <h1 className='product-gradinat-title'>
                                مواد تشکیل دهنده
                            </h1>
                            <ul className='product-ingradiant-list'>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index + 1} className='ingradiant-list-item'>
                                        <div className="gradiant-row">
                                            <span className='gradinat-title'>{ingredient.title}</span>
                                            <span className='gradinat-info'>{ingredient.info}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="left-side">
                        <img src="/public/description-image.jpg" alt="" />
                    </div>
                </div>
                <div className="product-delevry-infos">
                    <div className="product-delever-row">
                        {deliveryInfos.map((info, index) => (
                            <div key={index + 1} className="delevery-info">
                                <span className="delevery-info-top-part">{info.topPart}</span>
                                <h3 className="delevery-info-down-part">{info.downPart}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="suggestedProucts">
                <SectionHeader title="محصولات مرتبط" />
                <div className="container">

                    <Slider
                        Array={sameCategory}
                        Card={ProductCard}
                        paginationMode={true}
                        sizeInfoArray={[
                            { size: 600, slidesPerview: 2 },
                            { size: 990, slidesPerview: 3 },
                            { size: 4000, slidesPerview: 4 }
                        ]}
                    />
                </div>

            </div>

        </>
    )
}


export default Product