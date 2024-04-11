import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'
import MobileMenu from '../MobileMenu/MobileMenu'
import './Layout.scss'
const Layout = () => {
    return (
        <div className='mainSection'>
            <Navbar />
            <Outlet />
            <ScrollToTopButton />
            <MobileMenu />
            <Footer />
        </div>
    )
}

export default Layout