import * as React from 'react'
import { ToastContainer } from 'react-toastify'
import DashboardComponent from '../../components/dashboard/dashboard'
import Layout from '../../components/layout/layout'
import { OrganizationProvider } from '../../context/organization_data_context'
import { ParticipantProvider } from '../../context/participant_data_context'
import { QuestionProvider } from '../../context/question_data_context'
import { QuizProvider } from '../../context/quiz_data_context'

const Dashboard = () => {
	return (
		<>
			<Layout title='Dashboard '>
				<OrganizationProvider>
					<ParticipantProvider>
						<QuestionProvider>
							<QuizProvider>
								<DashboardComponent />
							</QuizProvider>
						</QuestionProvider>
					</ParticipantProvider>
				</OrganizationProvider>
			</Layout>
			<ToastContainer />
		</>
	)
}
export default Dashboard
