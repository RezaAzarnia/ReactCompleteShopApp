import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';
import PageTitle from '../../Components/PageTitle/PageTitle';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import FilterSidebar from '../../Components/FilterSidebar/FilterSidebar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { AiOutlineBars } from "react-icons/ai";
import NotFoundIcon from '../../Icons/NotFoundIcon';
import usePagination from '../../hooks/usePagination';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import './Shop.scss'

const Shop = () => {
    const { searchValue } = useParams()
    const allProducts = useSelector(state => state.products.products)
    const [products, setProducts] = useState([])
    const [isOpenFilterSidebar, setIsOpenFilterSidebar] = useState(false)
    const limit = 6;
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

    const { isDisableNextBtn, isDisableprevBtn, page, paginatedArray, nextPage, prevPage } = usePagination(products, limit)

    return (
        <>
            {
                products.length > 0 ?
                    <>
                        <PageTitle title="فروشگاه" />
                        <div className="shop container">
                            <BreadCrump activePage="فروشگاه" />
                            <div className="shop-row">
                                <FilterSidebar
                                    products={products}
                                    setProducts={setProducts}
                                    isOpenFilterSidebar={isOpenFilterSidebar}
                                    onClose={() => setIsOpenFilterSidebar(false)}
                                />
                                <div className="products-cards-wrapper">
                                    {/* show in small screen */}
                                    <FilterSidebarBtn setIsOpenFilterSidebar={setIsOpenFilterSidebar}/>
                                    <div className="products-cards-row">
                                        {paginatedArray?.map(item => <ProductCard {...item} key={item.id} />)}
                                    </div>
                                    {Math.max(products?.length / limit) > 1 &&
                                        <div className="pagination-row">
                                            <button onClick={() => prevPage()} disabled={isDisableprevBtn}>
                                                <FaArrowRightLong />
                                            </button>
                                            <span>{page}</span>
                                            <button onClick={() => nextPage()} disabled={isDisableNextBtn}>
                                                <FaArrowLeftLong />
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </>

                    : <NotFoundMessage />
            }
        </>
    )
}
const FilterSidebarBtn = ({setIsOpenFilterSidebar}) => {
    return (
        <div className="filter-sidebar-button" onClick={() => setIsOpenFilterSidebar(true)}>
            <AiOutlineBars />
            <span className='show-md'>
                فیلترها
            </span>
        </div>
    )
}

const NotFoundMessage = () => {
    return (<div className="not-found">
        <NotFoundIcon />
        <p>کالایی با این مشخصات پیدا نکردیم پیشنهاد میکنیم فیلتر ها را تغغیر دهید</p>
    </div>
    )
}
export default Shop;