import * as React from 'react'

import ParticipantComponent from '../../components/participant/Participant'
import { ParticipantHoc } from '../../components/highOrderComponents/ParticipantHoc'

const ParticipantWithContext = ParticipantHoc(ParticipantComponent)
export default function Participant() {
	return <ParticipantWithContext />
}
