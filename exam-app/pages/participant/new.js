// this is create participant page
import * as React from 'react'
import ParticipantPage from '../../components/common/form_modals/participant_page'
import { ParticipantHoc } from '../../hoc/participant_hoc'

// const AddParticipantWithContext = ParticipantHoc(CreateParticipant)
const AddParticipantWithContext = ParticipantHoc(ParticipantPage)
export default function AddParticipantPage() {
	return (
		<AddParticipantWithContext
			buttonText={'Add'}
			// isViewOnly={false}
		/>
	)
}
