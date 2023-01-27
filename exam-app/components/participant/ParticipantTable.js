import React from 'react'
import Table from '../common/Table'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { toast } from 'react-toastify'
import { ParticipantColumns } from './participantColumn'
import { DeleteParticipant } from '../../apis/participants'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { useRouter } from 'next/router'
const ParticipantTable = ({ data: participant_data, mutate }) => {
	const router = useRouter()
	const handleRemoveClick = async (participantId) => {
		try {
			DeleteParticipant(participantId)
			mutate()
			toast.success('participant deleted!')
		} catch (error) {
			toast.error('invalid request')
		}
	}

	const handleEditClick = async (participant) => {
		router.push(`${router.asPath}/edit/${participant.id}`)
	}

	// for sending the data to the backend

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

	return (
		<>
			<Table
				columns={ParticipantColumns}
				data={rowsDataArray || []}
				rowKey='id'
				className='bg-white p-4 w-full text-center rc-table-custom font-semibold '
			/>
		</>
	)
}

export default ParticipantTable
