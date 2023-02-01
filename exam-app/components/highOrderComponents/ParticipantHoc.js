import { useSelector } from 'react-redux'
import { GetOrganizationData } from '../../apis/organizations'
import {
	GetParticipantData,
	GetParticipantDataWithOrgId,
} from '../../apis/participants'
import { ParticipantContext } from '../context'
import Layout from '../layout/Layout'

export const ParticipantHoc = (Component) => {
	return function ParticipantHoc(props) {
		const user = useSelector((state) => state?.user)
		const { data: organization_data } = GetOrganizationData()
		const { data, mutate, error } =
			user?.role == 'SuperAdminUser'
				? GetParticipantData()
				: GetParticipantDataWithOrgId(user.Org_id)

		if (data?.error) {
			return (
				<>
					<Layout title='Participant'>
						<h1>Loading ...</h1>
					</Layout>
				</>
			)
		}

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
