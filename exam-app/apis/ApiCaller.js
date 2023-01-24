import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'
const token = Cookies.get('refresh_token')
const axios = require('axios')
const createAxiosInstance = (token) => {
	if (!global.__axiosInstance) {
		global.__axiosInstance = axios.create({
			baseURL: `${SERVER_LINK}`,
			headers: {
				Authorization: token,
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
		})
	}
	return global.__axiosInstance
}
export default createAxiosInstance(token)
