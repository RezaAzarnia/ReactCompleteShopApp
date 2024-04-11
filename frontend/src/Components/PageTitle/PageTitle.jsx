import React, { memo } from 'react'
import './PageTitle.scss'
const PageTitle = ({ title }) => {
    return (
        <div className="page-display-name">
            <h1 className='page-title'>{title}</h1>
        </div>
    )
}

export default memo(PageTitle)