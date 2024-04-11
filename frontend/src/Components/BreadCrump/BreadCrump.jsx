import React from 'react'
import { Link } from 'react-router-dom'
import './BreadCrump.scss'
const BreadCrump = ({ activePage }) => {
    return (
        <div className="bread-crump">
            <ul className="breadCrump-list">
                <li className="breadcrump-item diactive">
                    <Link to='/'>خانه</Link>
                </li>
                <li className="breadcrump-item">
                    {"  /  "}
                </li>
                <li className="breadcrump-item">
                    <Link>{activePage}</Link>
                </li>
            </ul>
        </div>
    )
}

export default BreadCrump