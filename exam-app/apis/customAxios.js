import axios from 'axios'
import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'

const token = Cookies.get('refresh_token')
console.log('token', token)
let customAxios

export const createAxiosInstance = (token) => {
	customAxios = axios.create({
		baseURL: `${SERVER_LINK}`,
		headers: {
			Authorization: token,
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
	})
	global.axiosInstance = customAxios
}

