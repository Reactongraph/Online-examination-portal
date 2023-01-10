import React, { useState } from 'react'
import Table from '../common/Table'

import axios from 'axios'
import { useRouter } from 'next/router'
import { SERVER_LINK } from '../../helpers/config'

import { useForm } from 'react-hook-form'
import 'react-pure-modal/dist/react-pure-modal.min.css'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ParticipantColumns } from './participantColumn'
import ParticipantPopUp from '../common/PopUpModals/ParticipantPopUp'

const ParticipantTable = ({ participant_data, organization_data }) => {
	const router = useRouter()
	const [editForm, setEditForm] = useState(false)
	const [modal, setModal] = useState(false)
	const [participantId, setParticipantId] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [mobile, setMobile] = useState('')
	const [buttonText, setButtonText] = useState('Add')
	const [password, setPassword] = useState('')
	const [organizationId, setOrganizationId] = useState('')
	const { handleSubmit } = useForm()
	const login_token = useSelector((state) => state.user.token)

	const handleRemoveClick = async (participantId) => {
		await axios
			.delete(`${SERVER_LINK}/participants/${participantId}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}
	const handleOrganizationIdTypeSelect = (event) => {
		let organizationId = event.target.value
		setOrganizationId(organizationId)
	}
	const handleEditClick = async (participantId) => {
		setModal(true)

		setButtonText('Update')
		setEditForm(true)
		setParticipantId(participantId)

		// first find the user with the id
		await axios
			.get(`${SERVER_LINK}/participants/${participantId}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then((response) => {
				let singleParticipantData = response.data

				setName(singleParticipantData.name)
				setEmail(singleParticipantData.email)
				setMobile(singleParticipantData.mobile)
				setOrganizationId(singleParticipantData.Organization_id)
				setPassword(singleParticipantData.password)
			})
			.catch(() => {
				toast.error('invalid request')
			})
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
			await axios
				.patch(
					`${SERVER_LINK}/participants/${participantId}`,
					participantData,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json;charset=UTF-8',
							Authorization: login_token,
						},
					}
					//
				)
				.then(() => {
					setModal(!modal)
					router.replace(router.asPath)
					toast.success('participant updated!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}

	function createData(name, email, mobile, participantId) {
		const action = (
			<>
				<button
					onClick={() => handleEditClick(participantId)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(participantId)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		return { name, email, mobile, action }
	}

	const rowsDataArray = participant_data.map((element) => {
		let name = element.name
		let email = element.email
		let mobile = element.mobile
		let participantId = element.id
		return createData(name, email, mobile, participantId)
	})

	const data = rowsDataArray

	return (
		<>
			<Table
				columns={ParticipantColumns}
				data={data}
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
				selectedorganizationId={organizationId}
				setSelectedOrganizationId={setOrganizationId}
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
