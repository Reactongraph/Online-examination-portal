import axios from 'axios'

import { SERVER_LINK } from '../helpers/config'

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
	return await axios.request({
		method: 'post',
		url: `${SERVER_LINK}/auth/change-password`,
		headers: {
			'Content-Type': 'application/json',
			xaccesstoken: token,
		},
		withCredentials: true,
		data: data,
	})
}

export async function GetRefreshToken(token) {
	return await axios.get(`${SERVER_LINK}/auth/refresh_token`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			xaccesstoken: token,
		},
	})
}
