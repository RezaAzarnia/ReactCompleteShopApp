import React from 'react'
import ReactDOM from 'react-dom';
import ProductDetail from '../../ProductDetail/ProductDetail';
import { TfiClose } from 'react-icons/tfi';
import './Modal.scss'


const Modal = ({ isOpen, setIsOpen, productName, price, productImage, id, description, category }) => {
    const productInfo = { productName, productImage, price, id, description, category }

    return ReactDOM.createPortal(
        <>
            <div className='overlay active' onClick={() => setIsOpen(false)}>
            </div>
            <div className={`simpleModal ${isOpen ? 'active' : ''} modal`}>
                <div className="close-modal-button" onClick={()=>setIsOpen(false)}>
                    <TfiClose />
                </div>
                <ProductDetail {...productInfo} />
            </div>
        </>
        ,
        document.querySelector('.modal-root')
    )
}
export default Modal