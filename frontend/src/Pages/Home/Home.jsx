import React from 'react'
import CustomerCareService from "../../Components/CustomerCareService/CustomerCareService"
import HeaderSlider from "../../Components/HeaderSlider/HeaderSlider"
import NewArrivals from "../../Components/NewArrivals/NewArrivals"
import TopProducts from "../../Components/TopProducts/TopProducts"
import WhyUs from "../../Components/WhyUs/WhyUs"
import CustomersFeedback from "../../Components/CustomersFeedback/CustomersFeedback"
import TopSales from '../../Components/TopSales/TopSales'
import ArtclesSection from "../../Components/ArtclesSection/ArtclesSection"
import { Link } from 'react-router-dom'
import './Home.scss'

const Home = () => {
  return (
    <div>
      <HeaderSlider />
      <CustomerCareService />
      <NewArrivals />
      <TopProducts />
      <WhyUs />
      <TopSales />
      <div className="topFoodSaler container">
        <img
          sizes="(max-width: 1240px) 100vw, 1240px"
          srcSet="
            ./burger_ivaaio_c_scale,w_200.jpg 200w,
            ./burger_ivaaio_c_scale,w_965.jpg 965w,
            ./burger_ivaaio_c_scale,w_1240.jpg 1240w"
          src="burger_ivaaio_c_scale,w_1240.jpg"
          alt="" />
        <div className="topSalerInfo">
          <div className="info-right-side">
            <span className="top-saler-top-title">برترین فروشنده هفته</span>
            <div className="top-info-title">
              <h2>غذایی خوشمزه برای شما!</h2>
              <div>
                <h2>از</h2>
                <h2 style={{ color: "var(--primary)" }}>19000 تومان</h2>
              </div>
            </div>
          </div>
          <div className="info-left-side">
            <h2>100% طبیعی </h2>
            <Link to='/shop'>خرید کنید</Link>
          </div>
        </div>
      </div>
      <CustomersFeedback />
      <ArtclesSection />
    </div>
  )
}

export default Home