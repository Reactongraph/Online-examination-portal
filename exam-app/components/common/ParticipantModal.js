import React, { useState } from 'react'

import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ParticipantPopUp from './PopUpModals/ParticipantPopUp'

const ParticipantModal = ({ modal, setModal, organization_data }) => {
	//For Image Preview
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const [mobile, setMobile] = useState('')

	const buttonText = 'Add'

	const [password, setPassword] = useState('')
	const [selectedorganizationId, setSelectedOrganizationId] = useState('')

	const { handleSubmit } = useForm()

	const login_token = useSelector((state) => state.user.token)
	const handleOrganizationIdTypeSelect = (event) => {
		let organizationId = event.target.value
		setSelectedOrganizationId(organizationId)
	}
	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile
		data.id = selectedorganizationId
		data.password = password

		let participantData = JSON.stringify(data)

		// for new data registration

		await axios({
			url: `${SERVER_LINK}/participants`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: login_token,
			},
			data: participantData,
		})
			.then(() => {
				router.replace(router.asPath)
				setName('')
				setEmail('')
				setMobile('')
				setPassword('')
				setSelectedOrganizationId('')
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
				handleOrganizationIdTypeSelect={handleOrganizationIdTypeSelect}
				organization_data={organization_data}
			/>
		</>
	)
}

export default ParticipantModal
