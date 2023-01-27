import React from 'react'
import Table from '../common/Table'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { toast } from 'react-toastify'
import { ParticipantColumns } from './participantColumn'
import { DeleteParticipant } from '../../apis/participants'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { useRouter } from 'next/router'
import { EyeIcon, ArchiveIcon } from '@heroicons/react/solid'
import { BsPencilSquare } from 'react-icons/bs'
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
	const handleViewClick = async (participant) => {
		router.push(`${router.asPath}/${participant.id}`)
	}

	// for sending the data to the backend

	function createData(participant) {
		const action = (
			<>
				<ButtonComponent
					className={`text-blue-500 hover:text-blue-700`}
					onClick={() => handleViewClick(participant)}>
					<EyeIcon className='h-6 h-6 ' />
				</ButtonComponent>
				<ButtonComponent
					onClick={() => handleEditClick(participant)}
					className={'text-green-500 hover:text-green-700 ml-2'}>
					<BsPencilSquare className='h-6 w-5 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(participant.id)}
					className={'text-red-500 hover:text-red-700  m-1'}>
					{/* <ArchiveBoxXMarkIcon class='h-6 h-6'/> */}
					<ArchiveIcon className='h-6 h-6'></ArchiveIcon>
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
