import axios from 'axios'
import { SERVER_LINK } from '../helpers/config'
const createAxiosInstance = (token) => {
    const customAxios = axios.create({
        baseURL: `${SERVER_LINK}`,
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    global.axiosInstance=customAxios;
}
global.createAxiosInstance=createAxiosInstance;
