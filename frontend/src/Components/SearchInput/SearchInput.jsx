import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import './SearchInput.scss'
const SearchInput = () => {

    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const navigateToShop = () => {
        if (searchValue !== "") {
            navigate(`/shop/${searchValue}`)
            setSearchValue('')
        }
    }
    return (
        <div className="search-input-row">
            <input type="text" placeholder='جستجو...'
                className='search-input'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                    e.keyCode === 13 &&
                        navigateToShop()
                }}
            />
            <LuSearch className='search-icon' onClick={navigateToShop} />
        </div>
    )
}

export default SearchInput