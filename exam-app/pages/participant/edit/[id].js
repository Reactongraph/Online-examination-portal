import * as React from 'react'
import CreateParticipant from '../../../components/participant/add_participant'
import { ParticipantHoc } from '../../../hoc/participant_hoc'

const EditParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function EditParticipantPage({ ParticipantId }) {
	return (
		<EditParticipantWithContext
			buttonText={'Edit'}
			editform={true}
			ParticipantId={ParticipantId}
		/>
	)
}
EditParticipantPage.getInitialProps = async ({ query: { id } }) => {
	return {
		ParticipantId: id,
	}
}
