import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Button from '../../Button/Button';
import { handleLogout } from '../../../Redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ExitModal.scss'


const ExitModal = ({ isOpen, onCancel }) => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        setIsLoading(true)
        dispatch(handleLogout())
        setIsLoading(false)
        navigate('/')
    }
    return ReactDOM.createPortal(
        <>
            <div className='overlay active' onClick={() => !isLoading && onCancel()}></div>
            <div className={`modal exit-modal ${isOpen ? 'active' : ''}`}>
                <div className='modal-header'>
                    <div className="text-part">
                        <h2>از حساب کاربری خود خارج می‌شوید ؟</h2>
                    </div>
                    <div className="exit-part">
                        <span onClick={onCancel}>&times;</span>
                    </div>
                </div>
                <div className="border-line"></div>
                <div className="modal-text">
                    <span className='modal-description' >
                        با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت.هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.
                    </span>
                </div>
                <div className="exit-modal-button">
                    <Button title="انصراف" onClick={onCancel} variant='outlined' />
                    <Button title="خروج از حساب " onClick={logout} variant='error' isLoading={isLoading} />
                </div>
            </div>
        </>
        ,
        document.querySelector('.modal-root')
    )

}
export default ExitModal;