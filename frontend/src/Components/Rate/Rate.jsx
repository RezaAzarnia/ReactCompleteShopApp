import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa6'
import './Rate.scss'
const Rate = ({ rateCount = 5 }) => {

    return (
        <>
            {
                <div className='rate'>
                    {
                        Array.from({ length: 5 }, (_, i) => {
                            return <FaStar
                                key={i + 1}
                                className={`${i + 1 <= rateCount ? 'fill' : ''}`}
                            />
                        })
                    }
                </div>
            }
        </>
    )
}

export default Rate