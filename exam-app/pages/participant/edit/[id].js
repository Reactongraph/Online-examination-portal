import * as React from 'react'
import ParticipantPage from '../../../components/common/form_modals/participant_page'
import { ParticipantHoc } from '../../../hoc/participant_hoc'

const EditParticipantWithContext = ParticipantHoc(ParticipantPage)
export default function EditParticipantPage({ participantId }) {
	return (
		<EditParticipantWithContext
			buttonText={'Edit'}
			isEdit={true}
			participantId={participantId}
		/>
	)
}
EditParticipantPage.getInitialProps = async ({ query: { id } }) => {
	return {
		participantId: id,
	}
}
