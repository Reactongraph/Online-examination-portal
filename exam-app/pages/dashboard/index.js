import * as React from 'react'
import { ToastContainer } from 'react-toastify'
import DashboardComponent from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'

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
