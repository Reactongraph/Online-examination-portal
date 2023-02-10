import * as React from 'react'
import CreateParticipant from '../../components/participant/add_participant'
import { ParticipantHoc } from '../../hoc/participant_hoc'

const ViewParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function ViewParticipantPage({ ParticipantId }) {
	return (
		<ViewParticipantWithContext
			isViewOnly={true}
			buttonText={'View'}
			ParticipantId={ParticipantId}
		/>
	)
}
ViewParticipantPage.getInitialProps = async ({ query: { id } }) => {
	return {
		ParticipantId: id,
	}
}
