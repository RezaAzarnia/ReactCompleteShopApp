import ProductCard from '../ProductCard/ProductCard'
import SectionHeader from '../SectionHeader/SectionHeader'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Slider from '../Slider/Slider'
import './TopSales.scss'

const TopSales = () => {
    const products = useSelector(state => state.products.products)
    const [topSalesProducts, setTopSalesProducts] = useState([])

    useEffect(() => {
        setTopSalesProducts([...products].sort(() => 0.5 - Math.random()).slice(0, 5))
    }, [products])

    return (
        <div className='topSalesWrapper'>
            <SectionHeader title="پرفروش ترین محصولات" />
            <div className="container">
                <Slider
                    Array={topSalesProducts}
                    Card={ProductCard}
                    sizeInfoArray={[
                        { size: 600, slidesPerview: 2 },
                        { size: 990, slidesPerview: 3 },
                        { size: 4000, slidesPerview: 4 }
                    ]}
                    paginationMode
                />
            </div>
        </div>
    )
}

export default TopSales