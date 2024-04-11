import React from 'react'
import './Loader.scss'
const Loader = () => {
    return (
        <div className="loaderWrapper" >
            <div className="loader">
                <div className="blue dot"></div>
                <div className="green dot"></div>
                <div className="red dot"></div>
            </div>
        </div >
    )
}

export default Loader