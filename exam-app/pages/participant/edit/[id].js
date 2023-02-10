import * as React from 'react'
import CreateParticipant from '../../../components/participant/add_participant'
import { ParticipantHoc } from '../../../hoc/participant_hoc'

const EditParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function EditParticipantPage({ participantId }) {
	return (
		<EditParticipantWithContext
			buttonText={'Edit'}
			editform={true}
			participantId={participantId}
		/>
	)
}
EditParticipantPage.getInitialProps = async ({ query: { id } }) => {
	return {
		participantId: id,
	}
}
