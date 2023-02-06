import * as React from 'react'
import CreateParticipant from '../../../components/participant/addParticipant'
import { ParticipantHoc } from '../../../components/highOrderComponents/ParticipantHoc'

const EditParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function EditParticipantPage() {
	return (
		<EditParticipantWithContext
			buttonText={'Edit'}
			editform={true}
		/>
	)
}
