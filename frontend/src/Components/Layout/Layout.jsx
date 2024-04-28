import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'
import MobileMenu from '../MobileMenu/MobileMenu'
import ScrollToTopOnNavigation from '../ScrollToTopOnNavigation/ScrollToTopOnNavigation'
import './Layout.scss'
const Layout = () => {
    return (
        <div className='mainSection'>
            <Navbar />
            <Outlet />
            <ScrollToTopButton />
            <MobileMenu />
            <Footer />
            <ScrollToTopOnNavigation />
        </div>
    )
}

export default Layout