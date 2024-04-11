import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { clearCart, selectCartTotalPrice } from '../../Redux/slices/cartSlice';
import { getCountryStates } from '../../service/Requests/state'
import { toast } from 'react-toastify';
import { postUserOrder } from '../../service/Requests/orders';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Form/Input'
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import PageTitle from '../../Components/PageTitle/PageTitle';
import WithAuth from '../../HOC/WithAuth'
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import './Checkout.scss'

const Checkout = ({ userInfo }) => {
    const methods = useForm();
    const { reset, handleSubmit, clearErrors, setError } = methods;
    const totalPrice = useSelector(selectCartTotalPrice)
    const cartItem = useSelector(state => state.cart.userCart)
    const [paymentMode, setPaymentMode] = useState("onlineMode")
    const [countryStates, setCountryStates] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [stateName, setStateName] = useState('')
    const [cityValue, setCityValue] = useState('')
    const [cities, setCities] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getStates = async () => {
        const allState = await getCountryStates()
        setCountryStates(allState)
    }
    useEffect(() => {
        getStates()
    }, [])
    const handleStateChange = (e) => {
        const selectedValue = e.target.value;
        setStateName(selectedValue);
        if (!selectedValue) {
            setError('state', {
                type: 'manual',
                message: 'لطفا استان مد نظر خود را انتخاب کنید'
            });
        } else {
            clearErrors('state');
            return selectedValue
        }
    }
    const handleCityChange = (e) => {
        const selectedValue = e.target.value;
        setCityValue(selectedValue)
        if (!selectedValue) {
            setError('city', {
                type: 'manual',
                message: 'لطفا شهر مد نظر خود را انتخاب کنید'
            });
        } else {
            clearErrors('city');
            return selectedValue
        }
    }

    useEffect(() => {
        if (stateName !== '') {
            setCityValue('')
            const cities = countryStates.filter(item => item.name == stateName)
            setCities(cities[0].cities)
        } else {
            setCities([])

        }
    }, [stateName])

    const convertNumbers2English = (string) => {
        return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => {
            return d.charCodeAt(0) - 1632;
        }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => {
            return d.charCodeAt(0) - 1776;
        });
    }

    const submitOrder = async (customerInfos) => {
        const orderDate = new Date().toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        try {
            setIsLoading(true)
            const datas = {
                id: Math.trunc(Math.random() * 10000),
                userId: userInfo.id,
                orders: [...cartItem],
                customerInfos,
                totalPrice: convertNumbers2English(totalPrice),
                paymentMode,
                orderDate
            }
            const response = await postUserOrder(datas)
            if (response.status == 200) {
                dispatch(clearCart())
                toast.success(response.message, {
                    autoClose: 2000,
                    closeOnClick: true,
                })
                setIsLoading(false)
                reset()
                navigate(`/receipt/${datas.id}`)
            }
        } catch (error) {
            toast.error(error, {
                autoClose: 2000,
                closeOnClick: true,
            })
        }
    }

    return (
        <div className="checkout">
            <PageTitle title="پرداخت" />
            <div className="container">
                <BreadCrump activePage="پرداخت" />
                <div className="chackeout-row">
                    <div className="checkout-form-wrapper">
                        <FormProvider {...methods}>
                            <form >
                                <div className="form-row">
                                    <div className="input-row">
                                        <Input name="userName" type='text' lableTitle="نام*" rules={{
                                            required: "لطفا نام خود را وارد کنید",
                                        }} />
                                        <Input name="famillyName" type='text' lableTitle="نام خانوادگی*" rules={{
                                            required: 'لطفا نام خانوادگی خود را وارد کنید'
                                        }} />
                                    </div>
                                    <Input name="companyName" type='text' lableTitle="نام شرکت(اختیاری)" />
                                    <div className="input-row">
                                        <Input
                                            name='state'
                                            type='select'
                                            lableTitle="استان"
                                            onChange={handleStateChange}
                                            rules={{ required: 'لطفا استان مد نظر خود را انتخاب کنید' }}
                                        >
                                            <option value=''>یک گزینه را انتخاب کنید</option>
                                            {
                                                countryStates.length > 0 &&
                                                countryStates.map((item, index) => {
                                                    return <option value={item.name} key={index + 1} >{item.name}</option>
                                                })
                                            }
                                        </Input>
                                        <Input
                                            name='city'
                                            type='select'
                                            lableTitle="شهر"
                                            onChange={handleCityChange}
                                            value={cityValue}
                                            rules={{ required: 'لطفا شهر مد نظر را انتخاب کنید' }}
                                        >
                                            <option value=''>یک گزینه را انتخاب کنید</option>
                                            {
                                                cities.length > 0 &&
                                                cities.map((item, index) => {
                                                    return <option value={item.name} key={index + 1}>{item.name}</option>
                                                })
                                            }
                                        </Input>
                                    </div>
                                    <Input name="address" type='text' placeholder="نام خیابان و پلاک خانه" lableTitle="آدرس*" rules={{
                                        required: "آدرس خود را وارد کنید"
                                    }} />
                                    <div className="input-row">
                                        <Input name="postCode" type='number' lableTitle="کدپستی (بدون فاصله و با اعداد انگلیسی) *" rules={{
                                            required: "کد پستی خود را وارد کنید"
                                        }} />
                                        <Input name="userPhone" type='number' lableTitle="تلفن" rules={{
                                            required: "شماره تلفن خود را وارد کنید",
                                            pattern: {
                                                value: /^(\+98|0)?9\d{9}$/,
                                                message: 'شماره تلفن صحیح نیست'
                                            }
                                        }} />
                                    </div>
                                    <Input name="email" type='text' lableTitle="آدرس ایمیل *" rules={{
                                        required: "آدرس ایمیل خود را وارد کنید",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "فرمت ایمیل صحیح نیست"
                                        }
                                    }} />
                                    <Input name='orderExplain' type="textarea" lableTitle="توضیحات سفارش" />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                    <CheckoutSummary
                        cartItem={cartItem}
                        setPaymentMode={setPaymentMode}
                        paymentMode={paymentMode}
                        totalPrice={totalPrice}
                        onClick={handleSubmit(submitOrder)}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div >
    )
}

export default WithAuth(Checkout)