import Layout from '../layout/Layout'
import { OrganizationContextProvider } from '../context/organization_data_context'
import { ParticipantContextProvider } from '../context/participant_data_context'

export const ParticipantHoc = (Component) => {
	return function ParticipantHoc(props) {
		return (
			<>
				<ParticipantContextProvider>
					<OrganizationContextProvider>
						<Layout title='Participant'>
							<Component {...props} />
						</Layout>
					</OrganizationContextProvider>
				</ParticipantContextProvider>
			</>
		)
	}
}
