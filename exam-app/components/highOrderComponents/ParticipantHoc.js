import { useSelector } from 'react-redux'
import { GetOrganizationData } from '../../apis/organizations'
import {
	GetParticipantData,
	GetParticipantDataWithOrgId,
} from '../../apis/participants'
import { ParticipantContext } from '../context'
import Layout from '../layout/Layout'

export const ParticipantHoc = (Component) => {
	return (props) => {
		const user = useSelector((state) => state?.user)
		const { data, mutate } =
			user?.role == 'SuperAdminUser'
				? GetParticipantData()
				: GetParticipantDataWithOrgId(user.Org_id)
		const { data: organization_data } = GetOrganizationData()

		return (
			<>
				<ParticipantContext.Provider
					value={{ participant_data: data, organization_data, mutate }}>
					<Layout title='Participant'>
						<Component {...props} />
					</Layout>
				</ParticipantContext.Provider>
			</>
		)
	}
}
