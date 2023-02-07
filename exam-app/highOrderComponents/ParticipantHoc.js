import Layout from '../layout/Layout'
import { OrganizationProvider } from '../context/organization_data_context'
import { ParticipantProvider } from '../context/participant_data_context'

export const ParticipantHoc = (Component) => {
	return function ParticipantHoc(props) {
		return (
			<>
				<ParticipantProvider>
					<OrganizationProvider>
						<Layout title='Participant'>
							<Component {...props} />
						</Layout>
					</OrganizationProvider>
				</ParticipantProvider>
			</>
		)
	}
}
