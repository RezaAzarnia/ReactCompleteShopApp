import React, { useState } from 'react'
import { SlCloudDownload, SlHeart } from "react-icons/sl";
import { BiUser } from "react-icons/bi";
import { CiLocationOn, CiLogout } from "react-icons/ci";
import { handleLogout } from '../../../Redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { TbChecklist } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../Components/Modals/ConfirmModal/ConfirmModal';
import WithAuth from '../../../HOC/WithAuth'
import './ProfileIndex.scss'

const ProfileIndex = ({ userInfo }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(handleLogout())
    navigate('/')
  }
  const profileCardMenu = [
    { id: 1, to: '/profile/orders', icon: <TbChecklist />, text: 'سفارشات من' },
    { id: 5, to: '/wishlist', icon: <SlHeart />, text: 'لیست علاقه‌مندی‌ها' },
    { id: 4, to: '/profile/accountdetail', icon: <BiUser />, text: 'جزئیات حساب کاربری' },
    { id: 2, to: '/profile/downloads', icon: <SlCloudDownload />, text: 'دانلود ها' },
    { id: 3, to: '/profile/address', icon: <CiLocationOn />, text: 'آدرس' },
    { id: 6, icon: <CiLogout />, text: 'خروج از حساب کاربری' }
  ];

  return (
    <>
      {
        isShowModal && 
        <ConfirmModal
          action='exit'
          isOpen={isShowModal}
          onCancel={() => setIsShowModal(false)}
          onConfirm={logout} />
      }

      <div className='profile-text'>
        <span>با سلام {userInfo.username} (آیا شما {userInfo.username} نیستید؟ خروج)</span>
        <p>
          از داشبورد حساب کاربری خود می‌توانید سفارشات اخیر خود را مشاهده کنید، آدرس‌های حمل و نقل و صورتحساب خود را مدیریت کنید و رمز عبور و جزئیات حساب خود را ویرایش کنید.
        </p>
      </div>
      <div className='profile-cards-row'>
        {
          profileCardMenu.map(item => {
            if (item.to) {
              return (
                <div className="profile-menu-card" key={item.id}>
                  <Link to={item.to} className='menu-card-link'>
                    <div className="card-icon">
                      {item.icon}
                    </div>
                    <div className='card-text'>
                      <span>{item.text}</span>
                    </div>
                  </Link>
                </div>
              )
            } else {
              return (
                <div className="profile-menu-card" style={{ cursor: "pointer" }} key={item.id} onClick={() => setIsShowModal(true)}>
                  <div className="card-icon">
                    {item.icon}
                  </div>
                  <div className='card-text'>
                    <span>{item.text}</span>
                  </div>
                </div>
              )
            }
          })
        }
      </div >
    </>
  )
}

export default WithAuth(ProfileIndex)