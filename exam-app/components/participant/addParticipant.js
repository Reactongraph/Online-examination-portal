import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	AddParticipant,
	EditParticipant,
	GetParticipantWithId,
} from '../../apis/participants'
import ParticipantPopUp from '../common/PopUpModals/ParticipantPopUp'

import { OrganizationContext } from '../context/context'

const CreateParticipant = ({ isViewOnly }) => {
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const [mobile, setMobile] = useState('')

	const [buttonText, setButtonText] = useState('Add')

	const [password, setPassword] = useState('')
	const [selectedorganizationId, setSelectedOrganizationId] = useState('')

	const { handleSubmit } = useForm()
	const [editform, setEditForm] = useState(false)
	const Org = useSelector((state) => state?.user)
	const { organization_data } = useContext(OrganizationContext)
	const handleOrganizationIdTypeSelect = (event) => {
		let organizationId = event.target.value
		setSelectedOrganizationId(organizationId)
	}
	useEffect(() => {
		let participant_id = router.query?.id
		async function getParticipantData() {
			const result = await GetParticipantWithId(participant_id)
			const participantData = result.data

			setName(participantData?.name)
			setEmail(participantData?.email)
			setPassword(participantData?.password)
			setMobile(participantData?.mobile)
			setSelectedOrganizationId(participantData?.Organization_id)

			isViewOnly ? setButtonText('View') : setButtonText('Edit')
			setEditForm(true)
		}
		if (router.query.id) {
			getParticipantData()
		}
	}, [router.query?.id])
	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile

		data.password = password
		if (editform) {
			let participantData = JSON.stringify(data)

			EditParticipant(participantData, router.query.id)
				.then(async () => {
					toast.success('participant  updated')
					router.replace(`/participant`)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} else {
			// for new data registration
			data.id = Org.Org_id
			let participantData = JSON.stringify(data)
			AddParticipant(participantData)
				.then(() => {
					router.replace(router.asPath)
					setName('')
					setEmail('')
					setMobile('')
					setPassword('')
					// setModal(!modal)
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
				name={name}
				setName={setName}
				mobile={mobile}
				setMobile={setMobile}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				selectedorganizationId={selectedorganizationId}
				setSelectedOrganizationId={setSelectedOrganizationId}
				handleSubmit={handleSubmit}
				checkWithDatabase={checkWithDatabase}
				buttonText={buttonText}
				handleOrganizationIdTypeSelect={handleOrganizationIdTypeSelect}
				organization_data={organization_data}
				isViewOnly={isViewOnly || false}
			/>
		</>
	)
}
export default CreateParticipant
