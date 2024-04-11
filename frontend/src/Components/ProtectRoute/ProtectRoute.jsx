import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectRoute = ({ children }) => {
    const isUserLoggedIn = useSelector(state => state.user.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate('/register', { replace: true })
        }
    }, [isUserLoggedIn])

    return children
}

export default ProtectRoute