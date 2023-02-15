import * as React from 'react'
import ParticipantPage from '../../components/common/form_modals/participant_page'
import { ParticipantHoc } from '../../hoc/participant_hoc'

const ViewParticipantWithContext = ParticipantHoc(ParticipantPage)
export default function ViewParticipantPage({ participantId }) {
	return (
		<ViewParticipantWithContext
			isViewOnly={true}
			buttonText={'View'}
			participantId={participantId}
		/>
	)
}
ViewParticipantPage.getInitialProps = async ({ query: { id } }) => {
	return {
		participantId: id,
	}
}
