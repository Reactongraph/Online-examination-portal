import { useSelector } from 'react-redux'
import {
	GetParticipantData,
	GetParticipantDataWithOrgId,
} from '../apis/participants'
import { ParticipantContext } from './context'
import Layout from '../components/layout/Layout'

export const ParticipantProvider = ({ children }) => {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
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
		<ParticipantContext.Provider value={{ participant_data: data, mutate }}>
			{children}
		</ParticipantContext.Provider>
	)
}
