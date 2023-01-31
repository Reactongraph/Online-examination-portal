import React, { useContext } from 'react'
import Table from '../common/Table'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { toast } from 'react-toastify'
import { ParticipantColumns } from './participantColumn'
import { DeleteParticipant } from '../../apis/participants'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { useRouter } from 'next/router'
import { BsPencilSquare } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { ParticipantContext } from '../context/context'

// import Participant
const ParticipantTable = () => {
	const { participant_data, mutate } = useContext(ParticipantContext)
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
	const handleViewClick = async (participant) => {
		router.push(`${router.asPath}/${participant.id}`)
	}

	// for sending the data to the backend

	function createData(participant) {
		const action = (
			<>
				<ButtonComponent
					className={`icon-view`}
					onClick={() => handleViewClick(participant)}>
					<AiFillEye className='h-6 w-7 ' />
				</ButtonComponent>
				<ButtonComponent
					onClick={() => handleEditClick(participant)}
					className={'icon-edit'}>
					<BsPencilSquare className='h-6 w-7 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(participant.id)}
					className={'icon-delete'}>
					<MdDelete className='h-6 w-7'></MdDelete>
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
