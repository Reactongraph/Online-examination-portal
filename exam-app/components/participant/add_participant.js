import React, { useContext } from 'react'
import ParticipantPage from '../common/form_modals/participant_page'

import { OrganizationContext } from '../../context/context'

const CreateParticipant = ({
	isViewOnly,
	buttonText,
	isEdit,
	participantId,
}) => {
	const { organization_data } = useContext(OrganizationContext)

	return (
		<>
			<ParticipantPage
				organization_data={organization_data}
				isViewOnly={isViewOnly || false}
				buttonText={buttonText}
				participantId={participantId}
				isEdit={isEdit}
			/>
		</>
	)
}
export default CreateParticipant
