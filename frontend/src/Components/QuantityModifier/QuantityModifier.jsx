import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { IoTrashOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteCartItem, handleUpdateQuantity } from '../../Redux/slices/cartSlice'
import './QuantityModifier.scss'
const QuantityModifier = ({ quantity, productId }) => {
    const userInfo = useSelector(state => state.user.userInfo)

    const [loading, setLoading] = useState(false)
    const { id: userId } = userInfo;

    const dispatch = useDispatch()

    const deleteCartItem = () => {
        setLoading(true)
        dispatch(handleDeleteCartItem({ userId, productId }))
            .then(() => setLoading(false))
    }

    const updateCartQuantity = (mode) => {
        setLoading(true)
        dispatch(handleUpdateQuantity({ userId, productId, mode }))
            .then(() => setLoading(false))

    }
    return (
        <div className="modify-count-cart">
            <button className="decrease-button" disabled={loading}>
                {
                    quantity <= 1 ?
                        <IoTrashOutline onClick={deleteCartItem} />
                        : <FiMinus onClick={() => updateCartQuantity('decrease')} />
                }
            </button>
            <span>
                {
                    loading ? (
                        <div className="quantity-loader">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    ) : (quantity)
                }
            </span>
            <button className="increase-button" disabled={loading}>
                <FiPlus onClick={() => updateCartQuantity('increase')} />
            </button>
        </div>
    )
}

export default QuantityModifier