import React from 'react'
import { NavLink } from 'react-router-dom'
import './ProfileSidebar.scss'
const ProfileSidebar = () => {
    const profileSidebarVales = [
        { id: 1, to: '/profile', text: "داشبورد" },
        { id: 2, to: '/profile/orders', text: "سفارش" },
        { id: 4, to: '/profile/address', text: "آدرس" },
        { id: 3, to: '/profile/downloads', text: "دانلود" },
        { id: 5, to: '/profile/accountdetail', text: "جزییات حساب" },
    ]
    return (
        <ul className="profile-menu-list">
            {
                profileSidebarVales.map(item => {
                    return <li className='profile-menu-list-item' key={item.id}>
                        <NavLink to={item.to} end>{item.text}</NavLink>
                    </li>
                })
            }
            <li className="profile-menu-list-item">
                خروج
            </li>
        </ul >

    )
}

export default ProfileSidebar