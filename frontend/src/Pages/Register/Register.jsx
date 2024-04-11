import React, { useEffect, useState } from 'react'
import PageTitle from '../../Components/PageTitle/PageTitle'
import Input from '../../Components/Form/Input'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '../../Components/Button/Button'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../service/Requests/users'
import { toast } from 'react-toastify'
import WithAuth from '../../HOC/WithAuth'
import { loginAsync } from '../../Redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import './Register.scss'

const Register = ({ isUserLogin }) => {
  const navigate = useNavigate()


  useEffect(() => {
    if (isUserLogin) {
      navigate('/')
    }
  }, [isUserLogin])


  const methods = useForm();
  const { reset, handleSubmit } = methods;
  const [isShowRegisterPart, setIsShowRegisterPart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (data) => {
    try {
      setIsLoading(true)
      const regitserResponse = await registerUser(data)
      if (regitserResponse.status == 200) {
        toast.success(regitserResponse.message, {
          autoClose: 2000,
          closeOnClick: true,
          className: 'toast-message'
        })
      }
      regitserResponse.status == 200 && reset();
    } catch (error) {
      toast.error(error, {
        autoClose: 2000,
        closeOnClick: true,
        className: 'toast-message'
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <PageTitle title="ورود/ثبت نام" />
      <div className="container">
        <BreadCrump activePage='ثبت نام' />
        <div className="register-wrapper">
          <div className="register-container">
            <div className="form-box">
              <div className="form-header">
                <div className={`register-tabpane-button ${!isShowRegisterPart ? 'active' : 'diactive'}`} onClick={() => setIsShowRegisterPart(false)}>
                  <span className='tabpane-item'>
                    ورود
                  </span>
                </div>
                <div className={`register-tabpane-button ${isShowRegisterPart ? 'active' : 'diactive'}`} onClick={() => setIsShowRegisterPart(true)}>
                  <span className='tabpane-item'>
                    ثبت نام
                  </span>
                </div>
              </div>
              {
                isShowRegisterPart ? (
                  <FormProvider {...methods}>
                    <form action="#">
                      <Input name="username" type='text' lableTitle=" نام کاربری خود را وارد کنید"
                        rules={
                          {
                            required: "لطفا نام کاربری خود را وارد کنید",
                            minLength: { value: 3, message: "نام کاربری حداقل باید 3 کاراکتر باشد" },
                            maxLength: { value: 32, message: "نام کاربر نمیتواند بیشتر از 32 کاراکتر باشد" },
                          }
                        } />
                      <Input name="email" type="email" lableTitle="ایمیل خود را وارد کنید"
                        rules={
                          {
                            required: "لطفا ایمیل خود را وارد کنید",
                            pattern: {
                              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "ایمیل خود را به درستی وارد کنید"
                            },
                          }
                        } />
                      <Input name="password" type="password" lableTitle="رمزعبور عبور خود را وارد کنید"
                        rules={
                          {
                            required: "لطفا رمزعبور خود را وارد کنید!",
                            minLength: { value: 8, message: "رمزعبور حداقل باید 8 کاراکتر باشد" },
                            maxLength: { value: 32, message: "رمزعبور نمیتواند بیشتر 32 کاراکتر باشد" },
                          }
                        } />
                    </form>
                    <div className="checkbox-row">

                      <div className="check-website-rules">
                        <input type="checkbox" id='checkout-rules-checkbox' defaultChecked required />
                        <label htmlFor="checkout-rules-checkbox">
                          تمامی قوانین سایت زا می‌پذیرم
                        </label>
                      </div>
                    </div>
                    <Button title='ثبت نام' onClick={handleSubmit(handleRegister)} isLoading={isLoading} />
                  </FormProvider>
                ) : (
                  <>
                    <LoginPart />
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const LoginPart = () => {
  const methods = useForm();
  const { reset, handleSubmit } = methods;
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data) => {
    try {
      setIsLoading(true)
      await dispatch(loginAsync(data)).then(res => {
        if (res.type == 'login/fulfilled') {
          reset()
        }
      })
    } catch (error) {
      toast.error(error, {
        autoClose: 2000,
        closeOnClick: true,
        className: 'toast-message'
      })
    } finally {
      setIsLoading(false)
    }
  };


  return (
    <>
      <FormProvider {...methods}>
        <form action="#">
          <Input name="email" type="email" lableTitle="ایمیل خود را وارد کنید"
            rules={
              {
                required: "لطفا ایمیل خود را وارد کنید",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "ایمیل خود را به درستی وارد کنید"
                },
              }
            } />
          <Input name="loginPassword" type="password" lableTitle="رمزعبور عبور خود را وارد کنید"
            rules={
              { required: "لطفا رمزعبور خود را وارد کنید!" }
            } />
        </form>
        <div className="checkbox-row">
          <div className="check-website-rules">
            <input type="checkbox" id='checkout-rules-checkbox' defaultChecked required />
            <label htmlFor="checkout-rules-checkbox">
              مرا به خاطر بسپار
            </label>
          </div>
          <div className="forget-password">
            <span>فراموشی رمز عبور ؟</span>
          </div>
        </div>
        <Button title='ورود' onClick={handleSubmit(handleLogin)} isLoading={isLoading} />
      </FormProvider>
      <div className="signin-with">
        <span>یا ورود با</span>
      </div>
      <div className="signin-icons-row">
        <div className="icon-wrapper" style={{ backgroundColor: "#1b4f9b" }}>
          <FaFacebookF />
        </div>
        <div className="icon-wrapper" style={{ backgroundColor: "#00adef" }}>
          <BsTwitter />
        </div>
        <div className="icon-wrapper" style={{ backgroundColor: "#0073b2" }}>
          <FaLinkedinIn />
        </div>
      </div>
    </>
  )
}


export default WithAuth(Register)