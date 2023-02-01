import * as React from 'react'
import CreateParticipant from '../../components/participant/addParticipant'
import { ParticipantHoc } from '../../components/highOrderComponents/ParticipantHoc'

const ViewParticipantWithContext = ParticipantHoc(CreateParticipant)
export default function ViewParticipantPage() {
	return <ViewParticipantWithContext isViewOnly={true} />
}
