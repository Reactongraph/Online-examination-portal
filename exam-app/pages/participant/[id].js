import * as React from 'react'
import Layout from '../../components/layout/Layout'
import CreateParticipant from '../../components/participant/addParticipant'
export default function ViewParticipantPage() {
	return (
		<>
			<Layout title='View Participant'>
				<CreateParticipant isViewOnly={true} />
			</Layout>
		</>
	)
}
