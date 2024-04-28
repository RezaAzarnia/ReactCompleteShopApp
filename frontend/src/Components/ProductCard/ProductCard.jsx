import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BsBag, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { FiSearch } from "react-icons/fi";
import useAddCart from "../../hooks/useAddCart";
import useWishlist from "../../hooks/useWishlist";
import Rate from "../Rate/Rate";
import Modal from "../Modals/Modal/Modal";
import './ProductCard.scss'

const ProductCard = ({ id: productId, productName, price, productImage, description, category, rate }) => {
    const [activeImage, setActiveImage] = useState(productImage[0])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [productLoader, setProductLoader] = useState({
        addCartLoader: false,
        addWishlistLoader: false
    })
    const { isProductLiked, addToWishlist, addToWishListStatus } = useWishlist(productId)
    const { handleAddCart, addToCartStatus } = useAddCart(productId)

    const handleHoverPicture = useCallback(() => setActiveImage(productImage[1]), [productImage])
    const handleOutPicture = useCallback(() => setActiveImage(productImage[0]), [productImage])

    //handle the showin loader in the product cart
    const toggleAddToCartLoader = useCallback(() => {
        setProductLoader(prev => ({ ...prev, addCartLoader: !prev.addCartLoader }))
    }, [])
    const toggleAddWishListLoader = useCallback(() => {
        setProductLoader(prev => ({ ...prev, addWishlistLoader: !prev.addWishlistLoader }))
    }, [])


    //effect for close loader when the status is not loading and the state is true
    useEffect(() => {
        if (productLoader.addCartLoader && addToCartStatus !== 'loading') {
            toggleAddToCartLoader()
        }
        if (productLoader.addWishlistLoader && addToWishListStatus !== 'loading') {
            toggleAddToCartLoader()
        }

    }, [addToCartStatus, addToWishListStatus])
    return (
        <>
            <div className='productCard' onMouseEnter={handleHoverPicture} onMouseLeave={handleOutPicture}>
                <div className="productCardPicture">
                    <Link to={`/product/${productId}`}> <img src={activeImage} alt="" /></Link>
                </div>
                <div className="productCardText">
                    <span className='productCardPrice'>{price?.toLocaleString('fa-IR')} تومان </span>
                    <Link to={`/product/${productId}`}>
                        <span className='productCardTitle'>{productName}</span>
                    </Link>
                    <Rate rateCount={rate} />
                </div>
                <div className="productCardIcons ">
                    <div
                        className="addToCart card-icon"
                        title='افزودن به سبد خرید'
                        onClick={() => {
                            toggleAddToCartLoader()
                            handleAddCart(productId, productName, price, productImage)
                        }}
                    >
                        {productLoader.addCartLoader && addToCartStatus == 'loading' ? <div className="spinner-loader"></div> : <BsBag />}
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
                            onClick={() => {
                                toggleAddWishListLoader()
                                addToWishlist(productId, productName, price, productImage)
                            }}
                        >
                            {productLoader.addWishlistLoader && addToWishListStatus == 'loading' ? <div className="spinner-loader"></div> : <BsHeart />}
                        </div>
                    )}
                    <div className="seeProduct card-icon" title='مشاهده سریع' onClick={() => setIsOpenModal(true)}>
                        <FiSearch />
                    </div>
                </div>
            </div >

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
        </>

    )
}

export default ProductCard
