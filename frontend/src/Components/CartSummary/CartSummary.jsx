import React, { useEffect, useState } from 'react'
import { selectCartTotalPrice } from '../../Redux/slices/cartSlice';
import { FormProvider, useForm } from 'react-hook-form'
import { getCountryStates } from '../../service/Requests/state'
import { useSelector } from 'react-redux';
import Button from '../Button/Button'
import Input from '../Form/Input'
import './CartSummary.scss'

const CartSummary = () => {
    const methods = useForm();
    const { reset, handleSubmit } = methods;
    const [countryStates, setCountryStates] = useState([])
    const cartTotalPrice = useSelector(selectCartTotalPrice)

    const getStates = async () => {
        const allState = await getCountryStates()
        setCountryStates(allState)
    }
    useEffect(() => {
        getStates()
    }, [])
    
    return (
        <div className="cart-summary-container">
            <h3 className='cart-summary-title '>مجموع سبد خرید</h3>
            <div className="cart-summary-row">
                <div className="cart-summary-price-row">
                    <span>جمع جزء</span>
                    <span className='cart-price'>{cartTotalPrice} تومان</span>
                </div>
                <div className="ship-infos">
                    <p className='ship-text'>حمل</p>
                    <p className='ship-free'>حمل و نقل رایگان</p>
                    <p className='ship-to'>ارسال به ایران ، آذربایجان شرقی</p>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit()} >
                            <Input name='country' type='select' >
                                <option value=''>انتخاب کشور/منطقه...</option>
                                <option value=''>ایران</option>
                            </Input>
                            <Input name='state' type='select'>
                                <option value=''>یک گزینه را انتخاب کنید</option>
                                {
                                    countryStates.length > 0 &&
                                    countryStates.map((item, index) => {
                                        return <option value={item.name} key={index + 1}>{item.name}</option>
                                    })
                                }
                            </Input>
                            <Input name='city' placeholder='شهر' />
                            <Input name='user' placeholder='کدپستی' />
                        </form>
                    </FormProvider>
                </div>
                <div className="border-line"></div>
                <div className="cart-summary-price-row">
                    <span>جمع کل</span>
                    <span className='cart-price'>{cartTotalPrice} تومان</span>
                </div>
                <Button title="برای تسویه حساب اقدام کنید" to='/checkout' />
            </div>
        </div>
    )
}

export default CartSummary