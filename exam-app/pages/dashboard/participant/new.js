// this is create participant page
import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import CreateParticipant from '../../../components/participant/addParticipant'

export default function AddOrganizations() {
	return (
		<>
			<Layout title='Participant'>
				<CreateParticipant />
			</Layout>
		</>
	)
}
