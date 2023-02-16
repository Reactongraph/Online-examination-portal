import {
	GetParticipantData,
	GetParticipantDataWithOrgId,
} from '../apis/participants'
import { ParticipantContext } from './context'
import Layout from '../components/layout/layout'
import { useSession } from 'next-auth/react'

export const ParticipantProvider = ({ children }) => {
	const { data: session } = useSession()
	const user = session?.user
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetParticipantData()
			: GetParticipantDataWithOrgId(user?.organization_id)
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
