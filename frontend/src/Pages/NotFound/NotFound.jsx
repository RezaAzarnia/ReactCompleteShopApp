import React from 'react'
import Button from '../../Components/Button/Button'
import './Notfound.scss'
const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="notfound-wrapper">
        <div className="notfound-picture">
          <img src="/public/404-4.png" alt="" />
        </div>
        <div className="notfound-text">
          <span>متاسفیم اما صفحه‌ای که به دنبال آن بودید پیدا نشد!</span>
        </div>
        <div className="backToShop">
          <Button to={'/'} title='برگشت به خانه' />
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage