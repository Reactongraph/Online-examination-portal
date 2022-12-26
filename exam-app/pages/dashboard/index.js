import * as React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'

import Dashboard from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

export default function dashboard() {
	return (
		<>
			<Layout title='Dashboard '>
				<Dashboard />
			</Layout>
			<ToastContainer />
		</>
	)
}
