import React from 'react'
import './Footer.scss'
const Footer = () => {
    const footerData = [
        {
            title: 'خدمات مشتری',
            items: ['راهنما و سوالات متداول', 'رهگیری سفارش', 'حمل و نقل تحویل', 'تاریخچه سفارشات']
        },
        {
            title: 'درباره ما',
            items: ['درباره ما', 'مشاغل', 'فروشگاه های ما', 'عودت محصول']
        },
        {
            title: 'لینک‌های مفید',
            items: ['خدمات ما', 'روش های پرداخت', 'راهنمای خدمات', 'تماس با ما']
        },
        {
            title: 'اطلاعات تماس',
            items: ['******0937', 'تبریز', 'rezaazarnia@gmail.com', 'شنبه تا پنجشنبه']
        }
    ];

    return (
        <footer>
            <div className="footerWrapper container">
                <div className="footer-row">
                    {
                        footerData.map((item, index) => {
                            return (
                                <div className="footer-item" key={index + 1}>
                                    <h4 className='footer-title'>{item.title}</h4>
                                    <ul className='footerLists'>
                                        {
                                            item.items.map((elem, index) => {
                                                return <li className='footerListItem' key={index + 1}>{elem}</li>
                                            })
                                        }
                                    </ul>
                                </div>

                            )
                        })
                    }
             
                </div>
            </div>
        </footer>
    )
}

export default Footer