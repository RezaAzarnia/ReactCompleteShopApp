import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';

const usePagination = (array, limit = 8) => {

    const [page, setPage] = useState(1);
    const [paginatedArray, setPaginatedArray] = useState([]);
    const [isDisableNextBtn, setIsDisableNextBtn] = useState(false);
    const [isDisableprevBtn, setIsDisablePrevBtn] = useState(false)
    const finishNumber = limit * page;
    const startNumber = finishNumber - limit;
    //slice array 
    useEffect(() => {
        setPaginatedArray(array?.slice(startNumber, finishNumber))
    }, [array, page])
    const { searchValue } = useParams()
    //reset the page number in the route change
    useEffect(() => {
        setPage(1)
    }, [searchValue])
    //buttons disable rules
    useEffect(() => {
        setIsDisableNextBtn(() => {
            return Math.ceil(array?.length / limit) === page
        })
        setIsDisablePrevBtn(() => {
            return page === 1
        })
    }, [page, paginatedArray])

    const nextPage = useCallback(() => {
        setPage(prev => prev + 1);
    }, [])


    const prevPage = useCallback(() => {
        setPage(prev => prev - 1)
    }, [])

    return useMemo(() => {
        return { paginatedArray, page, isDisableNextBtn, isDisableprevBtn, nextPage, prevPage }
    }, [paginatedArray, page, isDisableNextBtn, isDisableprevBtn, nextPage, prevPage])
}



export default usePagination