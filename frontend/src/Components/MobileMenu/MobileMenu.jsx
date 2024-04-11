import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuSearch } from 'react-icons/lu';
import { AiOutlineBars } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { SlHome } from "react-icons/sl";
import './MobileMenu.scss'


const MobileMenu = () => {
    const menuItems = [
        { icon: <SlHome className='mobile-menu-icon' />, text: 'خانه', link: '/' },
        { icon: <AiOutlineBars className='mobile-menu-icon' />, text: 'دسته ها', link: '/shop' },
        { icon: <BiUser className='mobile-menu-icon' />, text: 'حساب کاربری', link: '/profile' },
        { icon: <BsBag className='mobile-menu-icon' />, text: 'سبد خرید', link: '/cart' },
        { icon: <LuSearch className='mobile-menu-icon' />, text: 'جستجو', link: '#' },
    ];
    const [isActiveMenu, setIsActiveMenu] = useState(false)

    const handleShowMenu = () => {
        if (Math.floor(window.scrollY >= 300)) {
            setIsActiveMenu(true)
            return
        }
        setIsActiveMenu(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleShowMenu)
        return () => {
            window.removeEventListener('scroll', handleShowMenu)
        }
    }, [])
    return (
        <div className={`mobile-menu-wrapper ${isActiveMenu ? 'active' : ''}`}>
            <ul className="mobile-menu-list">
                {menuItems.map((item, index) => (
                    <li key={index} className="menu-list-item">
                        <Link className='mobile-menu-link' to={item.link}>
                            {item.icon}
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MobileMenu