import React from 'react'
import './Button.scss'
import { Link } from 'react-router-dom'
const Button = ({ to, title, onClick, isLoading, variant = 'contained' }) => {
    let className = null;
    switch (variant) {
        case 'contained':
            className = 'contained-button'
            break;
        case "outlined":
            className = "outline-button"
            break;
        case "error":
            className = 'error-button'
            break;
        default:
            break;
    }
    return (
        <div className='button-wrapper'>
            {
                to ?
                    (
                        <Link to={to} className={className}>
                            {title}
                        </Link>
                    ) : (
                        <button className={className}
                            onClick={onClick}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                    <div class="button-loader"></div> :
                                    title
                            }
                        </button>
                    )
            }
        </div>
    )
}

export default Button