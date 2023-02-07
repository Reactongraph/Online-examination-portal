import * as React from 'react'

// import ParticipantComponent from '../../participant/Participant'
import ParticipantComponent from '../../components/participant/Participant'
import { ParticipantHoc } from '../../HOC/ParticipantHoc'

const ParticipantWithContext = ParticipantHoc(ParticipantComponent)
export default function Participant() {
	return <ParticipantWithContext />
}
