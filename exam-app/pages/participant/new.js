// this is create participant page
import * as React from 'react'
import Layout from '../../components/layout/Layout'
import CreateParticipant from '../../components/participant/addParticipant'

export default function AddParticipantPage() {
	return (
		<>
			<Layout title='Add Patricipant'>
				<CreateParticipant />
			</Layout>
		</>
	)
}
