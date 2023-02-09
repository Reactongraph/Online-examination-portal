import * as React from 'react'

// import ParticipantComponent from '../../participant/Participant'
import ParticipantComponent from '../../components/participant/participant'
import { ParticipantHoc } from '../../hoc/participant_hoc'

const ParticipantWithContext = ParticipantHoc(ParticipantComponent)
export default function Participant() {
	return <ParticipantWithContext />
}
