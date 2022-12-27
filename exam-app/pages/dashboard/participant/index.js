import * as React from 'react'
import { SERVER_LINK } from '../../../helpers/config'
import axios from 'axios'
import Layout from '../../../components/layout/Layout'
import ParticipantComponent from '../../../components/participant/Participant'
import { useSelector } from 'react-redux'

export default function Participant({ participant_data, organization_data }) {
	const userRole = useSelector((state) => state.user?.role)
	const Org_id = useSelector((state) => state.user?.Org_id)

	if (userRole != 'SuperAdminUser') {
		let filteredParticipant = participant_data.filter(function (
			eachParticipant
		) {
			return eachParticipant.Organization_id === Org_id
		})

		let filteredOrganizationData = organization_data.filter(function (
			eachOrganization
		) {
			return eachOrganization.id === Org_id
		})

		return (
			<>
				<Layout title='Participant'>
					<ParticipantComponent
						participant_data={filteredParticipant}
						organization_data={filteredOrganizationData}
					/>
				</Layout>
			</>
		)
	}

	return (
		<>
			<Layout title='Participant'>
				<ParticipantComponent
					participant_data={participant_data}
					organization_data={organization_data}
				/>
			</Layout>
		</>
	)
}

// function for ssr data
export async function getServerSideProps(data) {
	// Fetch data from external API
	const res = await axios.get(`${SERVER_LINK}/participants/find`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: data.req.cookies.access_token,
		},
	})
	const organization = await axios.get(`${SERVER_LINK}/organization/find`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: data.req.cookies.access_token,
		},
	})

	let organization_data = organization.data
	let participant_data = res.data

	// Pass data to the page via props
	return { props: { participant_data, organization_data } }
}
