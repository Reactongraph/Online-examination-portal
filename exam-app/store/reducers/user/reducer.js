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
				payload: action.payload,
			}

		case userActionType.SET_LOGOUT:
			return {
				...state,
				defaultValues,
			}

		case userActionType.UPDATE_ACCESS_TOKEN:
			return {
				...state,
				isLogin: true,
				token: action.token,
				payload: action.payload,
			}

		default:
			return state
	}
}

export default userReducer
