import { SERVER_LINK } from '../helpers/config'
import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: SERVER_LINK,
	headers: { 'Content-Type': 'application/json' },
})
