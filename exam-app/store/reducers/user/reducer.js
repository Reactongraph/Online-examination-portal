import { userActionType } from './action'

const defaultValues = {
    isLogin: false,
    token: null,
}

const initialState = {
    isLogin: false,
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionType.SET_LOGIN:
            return {
                ...state,
                isLogin: true,
                token: action.token,
            }
            break

        case userActionType.SET_LOGOUT:
            return {
                ...state,
                defaultValues,
            }
            break

        case userActionType.UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                isLogin: true,
                token: action.token,
            }

        default:
            return state
            break
    }
}

export default userReducer
