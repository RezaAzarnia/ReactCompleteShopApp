import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { TfiClose } from "react-icons/tfi";
import SearchInput from '../SearchInput/SearchInput';
import "./SubMenu.scss"

const SubMenu = ({ isShowSliderMenu, closeSidebar }) => {
  const [isActiveFixMenu, setIsActiveFixMenu] = useState(false)

  const links = [
    { text: 'خانه', url: '/' },
    { text: 'فروشگاه', url: '/shop' },
    { text: 'درباره ما' },
    { text: 'وبلاگ' },
    { text: 'تماس با ما' }
  ];
  const handleActiveFixMenu = () => {
    if (Math.floor(window.scrollY >= 300 && window.innerWidth > 990)) {
      setIsActiveFixMenu(true)
      return
    }
    setIsActiveFixMenu(false)
  }

  const closeSidebarInBigScreen = () => {
    if (window.innerWidth > 990 && isShowSliderMenu) {
      closeSidebar()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleActiveFixMenu)
    return () => {
      window.removeEventListener('scroll', handleActiveFixMenu)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', closeSidebarInBigScreen)
    return () => {
      window.removeEventListener('resize', closeSidebarInBigScreen)
    }
  }, [isShowSliderMenu])
  return (
    <>

      {
        isShowSliderMenu &&
        <div className='overlay active' onClick={closeSidebar}>
          <TfiClose className='closeIcon' />
        </div>
      }

      <div className={`subMenuWrapper ${isActiveFixMenu ? 'fixed-submenu' : ''} ${isShowSliderMenu && 'active-submenu'}`}>
        <SearchInput />
        <div className="submenu-row">
          <ul className="submenu-list">
            {
              links.map((item, index) => {
                return <li className="submenu-list-item" key={index + 1}>
                  {item.url ?
                    <NavLink to={item.url}>{item.text}</NavLink>
                    : <Link to='/'>{item.text}</Link>}
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default SubMenu