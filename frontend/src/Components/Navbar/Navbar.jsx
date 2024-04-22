import React, { useEffect, useState } from 'react'
import WithAuth from '../../HOC/WithAuth';
import CartDropdown from '../CartDropdown/CartDropdown';
import { RxHamburgerMenu } from "react-icons/rx";
import { selectUserCartLength } from '../../Redux/slices/cartSlice';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsBag } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { SlHeart } from "react-icons/sl";
import SubMenu from '../SubMenu/SubMenu';
import SearchInput from '../SearchInput/SearchInput';
import './Navbar.scss'

const Navbar = ({ isUserLogin }) => {
    const [isShowCart, setIsShowCart] = useState(false)
    const [isOpenMenuSlider, setIsOpenMenuSlider] = useState(false)
    const userCartLength = useSelector(selectUserCartLength)
    const { pathname } = useLocation();

    // disable the body when the sidebar is open
    const toggleMenuSidebar = () => {
        setIsOpenMenuSlider(!isOpenMenuSlider)
        document.body.classList.toggle('disable-scroll', !isOpenMenuSlider);
    }
    // close the side bar by change the path name
    useEffect(() => {
        isOpenMenuSlider &&
            toggleMenuSidebar()
    }, [pathname])

    const toggleShowCart = () => {
        setIsShowCart(prev => !prev);
    };
    return (
        <>
            <div className="container">
                <div className="navbarContainer">
                    <nav>
                        <div className="navbar-row">
                            <div className="search-part">
                                <SearchInput />
                            </div>
                            {/* show the haburger menu in little size */}
                            <div className="hamburger-icon">
                                <RxHamburgerMenu onClick={toggleMenuSidebar} />
                            </div>
                            <div className="logo-part">
                                <Link to='/'>
                                    <img src="/public/brandPicture.png" alt="" />
                                </Link>
                            </div>

                            <div className="icons-part">
                                <div className="icons-row">
                                    <div className="profile-part">
                                        {
                                            isUserLogin ?
                                                <Link to='/profile'>
                                                    <BiUser className='navbar-icon' />
                                                </Link>
                                                : <Link to={"/register"}>
                                                    ورود | ثبت نام
                                                </Link>
                                        }
                                    </div>
                                    <div className="wishlist-part">
                                        <Link to="wishlist">
                                            <SlHeart className='navbar-icon' />
                                        </Link>
                                    </div>

                                    <div className="user-cart"
                                        onMouseEnter={toggleShowCart}
                                        onMouseLeave={toggleShowCart}>
                                        <Link to='/cart'>
                                            <BsBag className='navbar-icon' />
                                        </Link>
                                        {
                                            isShowCart &&
                                            <CartDropdown />
                                        }
                                        <div className="cart-badge">
                                            <span>
                                                {userCartLength}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <SubMenu
                isShowSliderMenu={isOpenMenuSlider}
                closeSidebar={toggleMenuSidebar}
            />
        </>

    )
}

export default WithAuth(Navbar)