import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { SERVER_LINK } from '../helpers/config'
import axios from 'axios'
import { useCookie } from 'next-cookie'

// To check for the refresh token on every page
export default function Layout({ children }) {
	const data = useCookie(children.cookie)

	let cookie = data.get('refresh_token') || ''
	const router = useRouter()
	const dispatch = useDispatch()

	const refreshToken = async () => {
		// if (cookie) {

		try {
			const response = await axios.get(`${SERVER_LINK}/auth/refresh_token`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					xaccesstoken: cookie,
				},
			})

			const newToken = response.data.access_token
			const payload = response.data.payload
			if (newToken) {
				if (
					router.asPath == '/login' ||
					router.asPath == '/' ||
					router.asPath == '/passwordReset' ||
					router.asPath == 'forgotPassword'
				) {
					dispatch({
						type: 'UPDATE_ACCESS_TOKEN',
						token: newToken,
						payload: payload,
					})

					router.push(`/dashboard`)
				} else {
					dispatch({
						type: 'UPDATE_ACCESS_TOKEN',
						token: newToken,
						payload: payload,
					})
					router.push(`${router.asPath}`)
				}
			}
		} catch (error) {
			if (
				router.pathname == `/passwordReset` ||
				router.asPath == '/forgotPassword'
			) {
				router.push(`${router.asPath}`)
			} else {
				router.push('/login')
			}
		}
	}

	useEffect(() => {
		refreshToken()
	}, [])

	return <>{children}</>
}
