import * as React from 'react'
import CreateParticipant from '../../../components/participant/add_participant'
import { ParticipantHoc } from '../../../hoc/participant_hoc'

const EditParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function EditParticipantPage() {
	return (
		<EditParticipantWithContext
			buttonText={'Edit'}
			editform={true}
		/>
	)
}
