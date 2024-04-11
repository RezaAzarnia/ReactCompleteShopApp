import React, { memo, useCallback, useState } from "react";
import { Link } from 'react-router-dom';
import { BsBag, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import useAddCart from "../../hooks/useAddCart";
import useWishlist from "../../hooks/useWishlist";
import Rate from "../Rate/Rate";
import Modal from "../Modals/Modal/Modal";
import { FiSearch } from "react-icons/fi";
import './ProductCard.scss'

const ProductCard = ({ id: productId, productName, price, productImage, description, category, rate }) => {
    const [activeImage, setActiveImage] = useState(productImage[0])
    const { isProductLiked, addToWishlist, addToWishListStatus } = useWishlist(productId)
    const { handleAddCart, addToCartStatus } = useAddCart(productId)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleHoverPicture = useCallback(() => {
        productImage.length > 1 && setActiveImage(productImage[1])
    }, [productImage])

    const handleOutPicture = useCallback(() => {
        setActiveImage(productImage[0])
    }, [productImage])
    return (
        <>
            {
                isOpenModal &&
                <Modal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                    id={productId}
                    productName={productName}
                    productImage={productImage}
                    description={description}
                    category={category}
                    price={price}
                />
            }

            <div className='productCard' onMouseEnter={handleHoverPicture} onMouseLeave={handleOutPicture}>
                <div className="productCardPicture">
                    <Link to={`/product/${productId}`}>
                        <img src={activeImage} alt="" />
                    </Link>
                </div>
                <div className="productCardText">
                    <div className="card-price">
                        <span className='productCardPrice'>{price?.toLocaleString('fa-IR')} تومان </span>
                    </div>
                    <div className="card-title">
                        <Link to={`/product/${productId}`}>
                            <span className='productCardTitle'>{productName}</span>
                        </Link>
                    </div>
                    <div className='productCardRate'>
                        <Rate rateCount={rate} />
                    </div>
                </div>
                <div className="productCardIcons ">
                    <div
                        className="addToCart card-icon"
                        title='افزودن به سبد خرید'
                        onClick={() => handleAddCart(productId, productName, price, productImage)}
                    >
                        {addToCartStatus == 'loading' ? <div className="spinner-loader"></div> : <BsBag />}
                    </div>
                    {isProductLiked ? (
                        <Link to='/wishlist'>
                            <div className="likeProduct card-icon"
                                title='مشاهده علاقه مندی ها'>
                                <BsFillHeartFill className="filled-liked-Icon" />
                            </div>
                        </Link>
                    ) : (
                        <div
                            className="likeProduct card-icon"
                            onClick={() => addToWishlist(productId, productName, price, productImage)}
                        >
                            {addToWishListStatus == 'loading' ? <div className="spinner-loader"></div> : <BsHeart />}

                        </div>
                    )}
                    <div className="seeProduct card-icon" title='مشاهده سریع' onClick={() => setIsOpenModal(true)}>
                        <FiSearch />
                    </div>
                </div>
            </div >

        </>

    )
}

export default memo(ProductCard)
