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
      <div className="topFoodSaler">
        <div className="container">
          <div className="topSalerPicture">
            <div className="topSalerInfo">
              <div className="info-right-side">
                <div className="top-saler-top-title">
                  <span>برترین فروشنده هفته</span>
                </div>
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
        </div>
      </div>
      <CustomersFeedback />
      <ArtclesSection />
    </div>
  )
}

export default Home