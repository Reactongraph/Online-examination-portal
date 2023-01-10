import React, { useState } from 'react'

import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AddParticipant } from '../../apis/participants'
import { GetOrganizationData } from '../../apis/organizations'
import ParticipantPopUp from './PopUpModals/ParticipantPopUp'

const ParticipantModal = ({ modal, setModal }) => {
	//For Image Preview
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const [mobile, setMobile] = useState('')

	const buttonText = 'Add'

	const [password, setPassword] = useState('')
	const [selectedorganizationId, setSelectedOrganizationId] = useState('')

	const { handleSubmit } = useForm()
	const Org = useSelector((state) => state?.user)
	const login_token = useSelector((state) => state.user.token)

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile
		data.id = Org.Org_id
		data.password = password

		let participantData = JSON.stringify(data)

		// for new data registration

		AddParticipant(participantData, login_token)
			.then(() => {
				router.replace(router.asPath)
				setName('')
				setEmail('')
				setMobile('')
				setPassword('')
				setModal(!modal)
				toast.success('participant created!')
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	return (
		<>
			<ParticipantPopUp
				name={name}
				setName={setName}
				mobile={mobile}
				setMobile={setMobile}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				modal={modal}
				setModal={setModal}
				selectedorganizationId={selectedorganizationId}
				setSelectedOrganizationId={setSelectedOrganizationId}
				handleSubmit={handleSubmit}
				checkWithDatabase={checkWithDatabase}
				buttonText={buttonText}
				// handleOrganizationIdTypeSelect={handleOrganizationIdTypeSelect}
				organization_data={GetOrganizationData(login_token).data}
			/>
		</>
	)
}

export default ParticipantModal
