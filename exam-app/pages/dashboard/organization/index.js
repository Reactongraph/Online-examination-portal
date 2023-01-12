import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import { useSelector } from 'react-redux'

import { GetOrganizationData, GetOrganizationDataWithId } from '../../../apis/organizations'
import OrganizationComponent from '../../../components/organization/Organization'


export default function organization() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser' 
		? GetOrganizationData(user.token) 
		: GetOrganizationDataWithId(user.token,user.Org_id)

	return (
		<>
			<Layout title='Organization'>
				<OrganizationComponent
					organization_data={data} 
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}

// export default function Participant() {
	// const user = useSelector((state) => state?.user)
	// const { data, mutate } =
	// 	user?.role == 'SuperAdminUser'
	// 		? GetParticipantData(user.token)
	// 		: GetParticipantDataWithOrgId(user.token, user.Org_id)
	// const { data: organization_data } = GetOrganizationData(user.token)

// 	return (
// 		<>
// 			<Layout title='Participant'>
// 				<ParticipantComponent
// 					participant_data={data}
// 					organization_data={organization_data}
// 					mutate={mutate}
// 				/>
// 			</Layout>
// 		</>
// 	)
// }

// function for ssr data

// export async function getServerSideProps(data) {
// 	const res = await axios.get(`${SERVER_LINK}/organization/find`, {
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json;charset=UTF-8',
// 			Authorization: data.req.cookies.access_token,
// 		},
// 	})
// 	let org_data = res.data
// 	return { props: { org_data } }
// }
