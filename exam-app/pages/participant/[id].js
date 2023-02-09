import * as React from 'react'
import CreateParticipant from '../../components/participant/add_participant'
import { ParticipantHoc } from '../../hoc/participant_hoc'

const ViewParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function ViewParticipantPage({ userId }) {
	return (
		<ViewParticipantWithContext
			isViewOnly={true}
			buttonText={'View'}
			userId={userId}
		/>
	)
}
ViewParticipantPage.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
