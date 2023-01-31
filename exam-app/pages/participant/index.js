import * as React from 'react'
import Layout from '../../components/layout/Layout'
import ParticipantComponent from '../../components/participant/Participant'
import { useSelector } from 'react-redux'
import {
	GetParticipantData,
	GetParticipantDataWithOrgId,
} from '../../apis/participants'
import { GetOrganizationData } from '../../apis/organizations'

export default function Participant() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetParticipantData()
			: GetParticipantDataWithOrgId(user.Org_id)
	const { data: organization_data } = GetOrganizationData()

	return (
		<>
			<Layout title='Participant'>
				<ParticipantComponent
					participant_data={data}
					organization_data={organization_data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}
