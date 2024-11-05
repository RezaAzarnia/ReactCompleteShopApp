import { useSelector } from 'react-redux'

const WithAuth = (OriginalComponent) => {
    const AuthenticatedComponent = (props) => {
        const isLogin = useSelector(state => state.user.isLogin)
        const userInformation = useSelector(state => state.user.userInfo)
        return (
            <OriginalComponent
                {...props}
                isUserLogin={isLogin}
                userInfo={userInformation}
            />
        )
    }
    return AuthenticatedComponent;
}

export default WithAuth