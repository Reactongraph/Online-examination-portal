import axios from 'axios'

export const customAxios = axios.create({
	headers: {
        Accept: 'application/json',
        'Content-Type':'application/json;charset=UTF-8',
    }
});
