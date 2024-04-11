import React from 'react'
import './SectionHeader.scss'
const SectionHeader = ({title}) => {
  return (
    <div className='container'>
        <div className="sectionHeaderWrappper">
            <h2 className='sectionTitle'>{title}</h2>
        </div>
    </div>
  )
}

export default SectionHeader