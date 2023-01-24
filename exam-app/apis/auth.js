import axios from 'axios'

import { SERVER_LINK } from '../helpers/config'
import  customAxios  from './customAxios'

export async function UserLogout() {
	return await axios.post(
		`${SERVER_LINK}/auth/logout`,
		{},
		{ withCredentials: true }
	)
}

export async function UserLogin(data) {
	return await axios.request({
		method: 'post',
		url: `${SERVER_LINK}/auth/login`,
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
		data,
	})
}

export async function ResetPassword(data, token) {
	return await customAxios.post(`/auth/change-password`,data)
}

export async function GetRefreshToken(token) {
	return await customAxios.get(`/auth/refresh_token`)
}
