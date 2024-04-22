import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ExitModal from '../Modals/ExitModal/ExitModal';
import './ProfileSidebar.scss'
const ProfileSidebar = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const handleModalToggle = () => {
        setIsShowModal(!isShowModal);
    };
    const profileSidebarVales = [
        { id: 1, to: '/profile', text: "داشبورد" },
        { id: 2, to: '/profile/orders', text: "سفارش" },
        { id: 4, to: '/profile/address', text: "آدرس" },
        { id: 3, to: '/profile/downloads', text: "دانلود" },
        { id: 5, to: '/profile/accountdetail', text: "جزییات حساب" },
        { id: 6, text: "خروج" },
    ]
    return (
        <>
            {
                isShowModal &&
                <ExitModal
                    isOpen={isShowModal}
                    onCancel={handleModalToggle}
                />
            }
            <ul className="profile-menu-list">
                {
                    profileSidebarVales.map(item => {

                        return (
                            item.to ?
                                <li className='profile-menu-list-item' key={item.id}>
                                    <NavLink to={item.to} end>{item.text}</NavLink>
                                </li>
                                :
                                <li className='profile-menu-list-item' key={item.id} onClick={handleModalToggle}>
                                    <>{item.text}</>
                                </li>
                        )
                    })
                }

            </ul>
        </>

    )
}

export default ProfileSidebar