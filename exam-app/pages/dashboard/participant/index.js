import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import ParticipantComponent from '../../../components/participant/Participant'
import { useSelector } from 'react-redux'
import {
	GetParticipantData,
	GetParticipantDataWithOrgId,
} from '../../../apis/participants'

export default function Participant() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetParticipantData(user.token)
			: GetParticipantDataWithOrgId(user.token, user.Org_id)
	console.log(data, "data")

	return (
		<>
			<Layout title='Participant'>
				<ParticipantComponent participant_data={data} mutate={mutate} />
			</Layout>
		</>
	)
}
