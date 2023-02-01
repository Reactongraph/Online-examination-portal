// this is create participant page
import * as React from 'react'
import CreateParticipant from '../../components/participant/addParticipant'
import { ParticipantHoc } from '../../components/highOrderComponents/ParticipantHoc'

const AddParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function AddParticipantPage() {
	return <AddParticipantWithContext />
}
