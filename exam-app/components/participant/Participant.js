import React from 'react'
import ParticipantTable from './ParticipantTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Participant = ({ participant_data, mutate, organization_data }) => {
	return (
		<FrontPageComponent
			title='PARTICIPANT'
			titleDescription='Add, update and delete'
			buttonTitle='ADD PARTICIPANT'
			editForm={false}
			mutate={mutate}
			data={participant_data}
			TableComponent={ParticipantTable}
			organization_data={organization_data}
		/>
	)
}
export default Participant
