// // this will check user authentication
// import React, { useEffect, useState } from 'react'
// import Router from 'next/router'

// import Cookies from 'js-cookie'

// const PrivateRoute = ({ component: Component, ...rest }) => {
// 	const [token, setToken] = useState(Cookies.get('refresh_token'))
// 	useEffect(() => {
// 		const intervalId = setInterval(() => {
// 			const refreshToken = Cookies.get('refresh_token')
// 			setToken(refreshToken)

// 			if (!refreshToken) {
// 				clearInterval(intervalId)
// 				Router.push('/login')
// 			}
// 		}, 1000)

// 		return () => clearInterval(intervalId)
// 	}, [])

// 	return <Component {...rest} />
// }

// export default PrivateRoute
// import React, { useEffect, useState } from 'react'
// import Router from 'next/router'

// import Cookies from 'js-cookie'

// const PrivateRoute = ({ component: Component, ...rest }) => {
// 	const [loading, setLoading] = useState(false)
// 	const [token, setToken] = useState(Cookies.get('refresh_token'))

// 	useEffect(() => {
// 		const intervalId = setInterval(() => {
// 			const refreshToken = Cookies.get('refresh_token')
// 			setToken(refreshToken)

// 			if (!refreshToken) {
// 				clearInterval(intervalId)
// 				setLoading(true)
// 				Router.push('/login')

// 			}
// 		}, 1000)

// 		return () => clearInterval(intervalId)
// 	}, [])

// 	if (loading) {
// 		return <div>Loading...</div>
// 	}

// 	return <Component loading={loading} { ...rest} />
// }

// export default PrivateRoute

import React, { useEffect, useState } from 'react'
import Router from 'next/router'

import Cookies from 'js-cookie'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [loading, setLoading] = useState(true)
	const [token, setToken] = useState(Cookies.get('refresh_token'))

	useEffect(() => {
		const intervalId = setInterval(() => {
			const refreshToken = Cookies.get('refresh_token')
			setToken(refreshToken)

			if (!refreshToken) {
				setLoading(true)
				Router.push('/login')
			} else {
				setLoading(false)
			}
		}, 1000)
		return () => clearInterval(intervalId)
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	return <Component {...rest} />
}

export default PrivateRoute
