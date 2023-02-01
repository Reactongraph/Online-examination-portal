import * as React from 'react'
import { ToastContainer } from 'react-toastify'
import DashboardComponent from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'
import PrivateRoute from '../../components/private_routes'

export default function Dashboard() {
	console.log('loading', loading)
	return (
		<>
			<Layout title='Dashboard '>
				<PrivateRoute component={DashboardComponent}>
					<DashboardComponent />
				</PrivateRoute>
			</Layout>
			<ToastContainer />
		</>
	)
}
