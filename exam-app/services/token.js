import store from '../store'
import jwt from 'jwt-decode'

//This is where we decode token
const getDecodedToken = (token) => {
    let userData = store.getState().user.client.userData
    if (userData) {
        return userData
    } else {
        const userData = jwt(token)
        updateLocalAccessToken(token, userData)
        return userData
    }
}

//This is where we set their access token
const updateLocalAccessToken = (token, userData) => {
    store.dispatch({
        type: 'UPDATE_ACCESS_TOKEN',
        isLogin: true,
        token: token,
        userData: userData,
    })
}

const TokenService = {
    getDecodedToken,
    updateLocalAccessToken,
}

export default TokenService
