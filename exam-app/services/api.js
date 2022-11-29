import { SERVER_LINK } from '../helpers/config';
import axios from 'axios';

const instance = axios.create({
    baseURL: SERVER_LINK,
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0'
    }
  });


  export default instance;