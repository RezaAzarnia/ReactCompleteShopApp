import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const WithAuth = (OriginalComponent) => {
    const AuthenticatedComponent = (props) => {
        const isLogin = useSelector(state => state.user.isLogin)
        const userInformation = useSelector(state => state.user.userInfo)

        const [isUserLogin, setIsUserLogin] = useState(false)
        const [userInfo, setUserInfo] = useState([])

        useEffect(() => {
            setUserInfo(userInformation)
            setIsUserLogin(isLogin)
        }, [isLogin])

        return (
            <OriginalComponent
                {...props}
                isUserLogin={isUserLogin}
                userInfo={userInfo}
            />
        )
    }
    return AuthenticatedComponent;
}

export default WithAuth