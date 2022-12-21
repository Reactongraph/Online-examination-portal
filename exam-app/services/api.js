import { SERVER_LINK } from '../helpers/config'
import axios from 'axios'
import Cookies from 'js-cookie'


// const instance = axios.create({
//     baseURL: SERVER_LINK,
//     withCredentials: true,
//     headers: {
//         'Cache-Control': 'no-cache',
//         Pragma: 'no-cache',
//         Expires: '0',
//     },
// })
export const axiosInstance = axios.create({
    baseURL: SERVER_LINK,
    headers: { "Content-Type": "application/json" },
  });
axiosInstance.interceptors.request.use(
    async (config) => {
      const token = Cookies.get("refresh_token");
      console.log("token",token);
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        };
        return { ...config, headers, withCredentials: true };
      }
    })
// export default instance
