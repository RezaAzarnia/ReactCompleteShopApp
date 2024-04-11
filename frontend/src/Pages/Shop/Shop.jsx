import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';
import PageTitle from '../../Components/PageTitle/PageTitle';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import FilterSidebar from '../../Components/FilterSidebar/FilterSidebar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { AiOutlineBars } from "react-icons/ai";

import './Shop.scss'
import NotFoundIcon from '../../Icons/NotFoundIcon';
const Shop = () => {
    const { searchValue } = useParams()
    const allProducts = useSelector(state => state.products.products)
    const [products, setProducts] = useState([])
    const [isOpenFilterSidebar, setIsOpenFilterSidebar] = useState(false)

    useEffect(() => {
        if (searchValue == 'all' || searchValue == undefined) {
            setProducts(allProducts)
        } else {
            const filterProducts = allProducts?.filter(item => {
                return item.category.includes(searchValue) || item.productName.includes(searchValue)
            });
            setProducts(filterProducts)
        }
    }, [searchValue, allProducts])



    return (
        <>
            {
                products.length > 0 ?
                    <div className='shop'>
                        <PageTitle title="فروشگاه" />
                        <div className="container">
                            <BreadCrump activePage="فروشگاه" />
                            <div className="shop-row">
                                <FilterSidebar products={products} setProducts={setProducts} isOpenFilterSidebar={isOpenFilterSidebar} onClose={() => setIsOpenFilterSidebar(false)} />
                                <div className="products-cards-wrapper">
                                    <div className="filter-sidebar-button" onClick={() => setIsOpenFilterSidebar(true)}>

                                        <AiOutlineBars />

                                        <span className='show-md'>
                                            فیلترها
                                        </span>
                                    </div>
                                    <div className="products-cards-row">

                                        {
                                            products.map(item => {

                                                return <ProductCard {...item} key={item.id} />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : (
                        (
                            <div className="not-found">
                                <NotFoundIcon />
                                <p>کالایی با این مشخصات پیدا نکردیم پیشنهاد میکنیم فیلتر ها را تغغیر دهید</p>
                            </div>

                        )
                    )
            }
        </>
    )
}



export default Shop;