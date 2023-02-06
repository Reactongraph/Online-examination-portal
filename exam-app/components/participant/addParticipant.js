import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { AddParticipant, EditParticipant } from '../../apis/participants'
import ParticipantPopUp from '../common/PopUpModals/ParticipantPopUp'

import { OrganizationContext } from '../context/context'

const CreateParticipant = ({ isViewOnly, buttonText, editform }) => {
	const router = useRouter()

	const { organization_data } = useContext(OrganizationContext)

	const checkWithDatabase = async (data) => {
		if (editform) {
			let participantData = JSON.stringify(data)

			EditParticipant(participantData, router.query?.id)
				.then(async () => {
					toast.success('participant  updated')
					router.replace(`/participant`)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} else {
			// for new data registration
			let participantData = JSON.stringify(data)
			AddParticipant(participantData)
				.then(() => {
					router.replace(`/participant`)

					toast.success('participant created!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}
	return (
		<>
			<ParticipantPopUp
				checkWithDatabase={checkWithDatabase}
				organization_data={organization_data}
				isViewOnly={isViewOnly || false}
				buttonText={buttonText}
			/>
		</>
	)
}
export default CreateParticipant
