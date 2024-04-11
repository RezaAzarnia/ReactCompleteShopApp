import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import PageTitle from '../PageTitle/PageTitle'
import BreadCrump from '../BreadCrump/BreadCrump'
import './ProfileLayout.scss'
const ProfleLayout = () => {
    return (
        <>
            <PageTitle title="پروفایل" />
            <div className='container'>
                <BreadCrump activePage='پروفایل' />
                <div className="profile-row">
                    <div className="profile-menu">
                        <ProfileSidebar />
                    </div>
                    <div className="profile-main">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfleLayout