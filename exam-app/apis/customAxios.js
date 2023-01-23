import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'
const token = Cookies.get('refresh_token')
const axios = require('axios')
let customAxios
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
	customAxios = global.__axiosInstance
}
createAxiosInstance(token)
export default customAxios
