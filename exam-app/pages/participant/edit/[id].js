import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import CreateParticipant from '../../../components/participant/addParticipant'
export default function EditParticipantPage() {
	return (
		<>
			<Layout title='Edit Participant'>
				<CreateParticipant />
			</Layout>
		</>
	)
}
