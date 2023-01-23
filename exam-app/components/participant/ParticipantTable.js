import React, { useState } from 'react'
import Table from '../common/Table'
import { useForm } from 'react-hook-form'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ParticipantColumns } from './participantColumn'
import ParticipantPopUp from '../common/PopUpModals/ParticipantPopUp'
import {
	AddParticipant,
	DeleteParticipant,
	EditParticipant,
} from '../../apis/participants'
import { ButtonComponent } from '../common/micro/buttonComponent'

const ParticipantTable = ({
	data: participant_data,
	mutate,
	organization_data,
}) => {
	const [editForm, setEditForm] = useState(false)
	const [modal, setModal] = useState(false)
	const [participantId, setParticipantId] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [mobile, setMobile] = useState('')
	const [buttonText, setButtonText] = useState('Add')
	const [password, setPassword] = useState('')
	const [organizationId, setOrganizationId] = useState('')
	const [selectedorganizationId, setSelectedOrganizationId] = useState('')
	const { handleSubmit } = useForm()
	const user = useSelector((state) => state?.user)

	const handleRemoveClick = async (participantId) => {
		try {
			DeleteParticipant(participantId)
			mutate()
			toast.success('participant deleted!')
		} catch (error) {
			toast.error('invalid request')
		}
	}
	const handleOrganizationIdTypeSelect = (event) => {
		let organizationId = event.target.value

		setSelectedOrganizationId(organizationId)
	}

	const handleEditClick = async (participant) => {
		setModal(true)
		setButtonText('Update')
		setEditForm(true)
		setParticipantId(participant.id)
		setName(participant.name)
		setEmail(participant.email)
		setMobile(participant.mobile)
		setOrganizationId(participant.Organization_id)
		setPassword(participant.password)
	}

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile
		data.Organization_id = organizationId
		data.password = password
		let participantData = JSON.stringify(data)
		// for taking the patch api data
		if (editForm) {
			EditParticipant(participantData, participantId)
				.then(() => {
					setModal(!modal)
					mutate()
					toast.success('participant updated!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
		// for new data registration
		else {
			AddParticipant(data)
				.then(async () => {
					setModal(!modal)
					mutate()
					toast.success('participant added!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}

	function createData(participant) {
		const action = (
			<>
				<ButtonComponent
					onClick={() => handleEditClick(participant)}
					className={
						'bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'
					}>
					Edit
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(participant.id)}
					className={
						'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
					}>
					Delete
				</ButtonComponent>
			</>
		)
		return {
			name: participant.name,
			email: participant.email,
			mobile: participant.mobile,
			action,
		}
	}

	const rowsDataArray = participant_data?.map((element) => {
		return createData(element)
	})

	// const data = rowsDataArray

	return (
		<>
			<Table
				columns={ParticipantColumns}
				data={rowsDataArray || []}
				rowKey='id'
				className='bg-white p-4 w-full text-center rc-table-custom font-semibold '
			/>

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

export default ParticipantTable
