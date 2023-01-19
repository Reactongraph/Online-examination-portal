import axios from 'axios'

import { SERVER_LINK } from '../helpers/config'

export async function UserLogout() {
	return await axios.post(
		`${SERVER_LINK}/auth/logout`,
		{},
		{ withCredentials: true }
	)
}
