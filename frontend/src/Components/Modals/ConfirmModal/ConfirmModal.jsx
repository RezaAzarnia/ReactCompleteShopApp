import React from 'react'
import ReactDOM from 'react-dom';
import Button from '../../Button/Button';
import './ConfirmModal.scss'


export default function ConfirmModal({ action, isOpen, onCancel, onConfirm, isLoading }) {

    return ReactDOM.createPortal(
        <>
            <div className='overlay active' onClick={() => !isLoading && onCancel()}></div>
            <div className={`modal confirm-modal ${isOpen ? 'active' : ''}`}>
                <div className={`modal-header  ${action}`}>
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
                <div className="confirm-modal-button">
                    <Button title="انصراف" onClick={onCancel} variant='outlined' />
                    <Button title="خروج از حساب " onClick={onConfirm} variant='error' />
                </div>
            </div>
        </>
        ,
        document.querySelector('.modal-root')
    )

}
