// this is create participant page
import * as React from 'react'
import CreateParticipant from '../../components/participant/add_participant'
import { ParticipantHoc } from '../../hoc/participant_hoc'

const AddParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function AddParticipantPage() {
	return <AddParticipantWithContext />
}
