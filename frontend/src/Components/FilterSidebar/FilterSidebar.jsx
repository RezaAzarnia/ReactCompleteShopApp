import React, { useEffect, useState } from 'react'
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './FilterSidebar.scss'
import { TfiClose } from 'react-icons/tfi';

const FilterSidebar = ({ isOpenFilterSidebar, onClose, products, setProducts }) => {
  const allProducts = useSelector(state => state.products.products)
  const [cateories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  useEffect(() => {
    const uniqueCategries = [...new Set(allProducts.map(item => item.category))]
    const newData = uniqueCategries.map(item => {
      return {
        categoryName: item,
        categoryLength: allProducts.filter(product => product.category == item).length
      }
    })
    setCategories(newData)
  }, [allProducts])

  useEffect(() => {
    //if products length less than two don't apply sort on the price
    if (products.length < 2) {
      setPriceRange([0, products[0].price])
      setSelectedPriceRange([0, products[0].price]);
      return
    } else {
      let sortedArray = [...products].sort((a, b) => a.price - b.price);

      setPriceRange([sortedArray[0].price, sortedArray[sortedArray.length - 1].price]);


      setSelectedPriceRange([sortedArray[0].price, sortedArray[sortedArray.length - 1].price]);
    }
  }, [products]);

  const filterPrice = () => {
    const filteredPriceArray = [...products].filter(item => item.price >= selectedPriceRange[0] && item.price <= selectedPriceRange[1])

    setProducts(filteredPriceArray)
  }
  const closeSidebarInBigScreen = () => {
    if (window.innerWidth > 990 && isOpenFilterSidebar) {
      onClose()
    }
  }
  useEffect(() => {
    window.addEventListener('resize', closeSidebarInBigScreen)
    return () => {
      window.removeEventListener('resize', closeSidebarInBigScreen)
    }
  }, [isOpenFilterSidebar])


  return (
    <>
      {
        isOpenFilterSidebar &&
        <div className='overlay active' onClick={onClose}>
          <TfiClose className='closeIcon' />
        </div>
      }
      <div className={`products-filter-sidebar ${isOpenFilterSidebar ? 'active' : ''}`}>
        <div className="category-filter">
          <ul className='category-filter-list'>
            <li>
              <h3 className='sidebar-title'>همه دسته بندی ها</h3>
            </li>
            {
              cateories.length > 0 &&
              cateories.map((category, index) => {
                return (
                  <li className='sidebar-items' key={index + 1}>
                    <Link to={`/shop/${category.categoryName}`} >
                      {category.categoryName} ({category.categoryLength})
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="price-filter">
          <h3 className='sidebar-title'>فیلتر بر اساس قیمت</h3>
          <div className="price-filter-ranger">
            {
              priceRange.length > 0 &&
              <>
                <div className="price-range-show">
                  <div className="min-price">
                    <span className='minimum-price'>
                      {selectedPriceRange[0].toLocaleString('fa')} تومان
                    </span>
                  </div>
                  <div className="max-price">
                    <span className='maximum-price'>
                      {selectedPriceRange[1].toLocaleString('fa')} تومان
                    </span>
                  </div>
                </div>
                <Slider range onChange={(value) => setSelectedPriceRange(value)}
                  min={priceRange[0]} max={priceRange[1]}
                  value={selectedPriceRange}
                  railStyle={{ backgroundColor: "lightgray", height: 3 }}
                  trackStyle={{ backgroundColor: "var(--primary)", height: 3 }}
                  handleStyle={{
                    borderColor: "var(--primary)",
                    backgroundColor: "var(--primary)"
                  }}
                />
              </>
            }
          </div>
          <div className="filter-button">
            <Button title="فیلتر قیمت" onClick={filterPrice} />
          </div>
        </div>
        <div className="labels">
          <h3 className='sidebar-title'>برچسب ها</h3>
          <div className="lables-row">
            {
              cateories.map((category, index) => {
                return (
                  <div className="lable" key={index + 1}>
                    <Link to={`/shop/${category.categoryName}`} className='labelLink'>
                      {category.categoryName}
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar