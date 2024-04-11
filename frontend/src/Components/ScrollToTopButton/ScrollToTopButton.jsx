import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import './ScrollToTopButton.scss'
const ScrollToTopButton = () => {
    const [isActive, setIsActive] = useState(false)
    const [progresSize, setProgressSize] = useState(0)
    const handleScrollAction = () => {
        const progressBar = Math.trunc((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 152)
        setProgressSize(progressBar)
        setIsActive(window.scrollY >= 300)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScrollAction)
        return () => {
            window.removeEventListener('scroll', handleScrollAction)
        }
    }, [])

    return (
        <>
            <div className={`scroll-button ${isActive ? 'active' : ""}`} onClick={() => scrollTo(0, 0)}>
                <div className="scroll-button-border">
                    <svg width="50" height="50">
                        <circle
                            id="progress-indicator"
                            fill="transparent"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            strokeMiterlimit="10"
                            cx="25"
                            cy="25"
                            r="24"
                            style={{ strokeDasharray: `${progresSize}, ${152}` }}
                        />
                    </svg>
                </div>
                <div className="button-scroll">
                    <button>
                        <IoIosArrowUp />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ScrollToTopButton