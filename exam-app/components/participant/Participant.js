import React from 'react'
import ParticipantTable from './ParticipantTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Participant = () => {
	return (
		<FrontPageComponent
			title='PARTICIPANT'
			titleDescription='Add, update and delete'
			buttonTitle='ADD PARTICIPANT'
			editForm={false}
			TableComponent={ParticipantTable}
		/>
	)
}
export default Participant
