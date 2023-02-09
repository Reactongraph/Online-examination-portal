import * as React from 'react'
import { ToastContainer } from 'react-toastify'
import DashboardComponent from '../../components/dashboard/dashboard'
import Layout from '../../components/layout/layout'

const Dashboard = () => {
	return (
		<>
			<Layout title='Dashboard '>
				<DashboardComponent />
			</Layout>
			<ToastContainer />
		</>
	)
}
export default Dashboard
