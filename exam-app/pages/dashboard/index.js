import * as React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'

import DashboardComponent from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

export default function Dashboard() {
	return (
		<>
			<Layout title='Dashboard '>
				<DashboardComponent />
			</Layout>
			<ToastContainer />
		</>
	)
}
