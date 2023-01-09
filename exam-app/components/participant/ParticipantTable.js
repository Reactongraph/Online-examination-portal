import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	AddParticipant,
	DeleteParticipant,
	EditParticipant,
	GetParticipantData,
	GetParticipantDataWithOrgId
} from '../../apis/participants'
import Table from '../common/Table'
import { columns } from './TableColumn'

const ParticipantTable = ({ participant_data, mutate }) => {

	const [editForm, setEditForm] = useState(false)
	const [modal, setModal] = useState(false)
	const [participantId, setParticipantId] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [mobile, setMobile] = useState('')
	const [buttonText, setButtonText] = useState('Add')
	const [password, setPassword] = useState('')
	const [organizationId, setOrganizationId] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const { handleSubmit } = useForm()
	const user = useSelector((state) => state?.user)

	const handleRemoveClick = async (participantId) => {
		try {
			DeleteParticipant(participantId, user?.token)
			mutate()
			toast.success('participant deleted!')
		}
		catch (error) {
			toast.error('invalid request')
		}
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
			EditParticipant(participantData, participantId, user?.token)
				.then(() => {
					setModal(!modal)
					mutate()
					toast.success('participant updated!')
				}).catch(error => {
					toast.error('invalid request')
				})
		}
		// for new data registration
		else {
			AddParticipant(data, user?.token)
				.then(async (data) => {
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
				<button
					onClick={() => handleEditClick(participant)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(participant.id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
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
				columns={columns}
				data={rowsDataArray || []}
				rowKey='id'
				className='bg-white p-4 w-full text-center rc-table-custom font-semibold '
			/>

			<PureModal
				isOpen={modal}
				width='800px'
				onClose={() => {
					setModal(false)
					return true
				}}>
				<div className='flex-row space-y-3 relative'>
					<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
						<p>{buttonText} Participant</p>
					</div>

					<div className='py-6 px-6 lg:px-8'>
						<form
							className='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='grid-first-name'>
										Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='name'
										type='text'
										value={name}
										required='required'
										onChange={(e) => setName(e.target.value)}
										placeholder='Jane'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='grid-last-name'>
										Email
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='email'
										type='email'
										placeholder='example@gmail.com '
										required='required'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='grid-password'>
										Password
									</label>
									<div className='relative'>
										<input
											className='appearance-none block w-full p-4  bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											id='password'
											type={!showPassword ? 'password' : 'text'}
											placeholder='******************'
											required='required'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<button
											type='button'
											onClick={() => setShowPassword(!showPassword)}
											className='text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500   font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-300 dark:hover:bg-blue-400 '>
											{!showPassword ? 'Show' : 'Hide'}
										</button>
									</div>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you{`&apos;`}d like
									</p>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='grid-first-name'>
										Mobile
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='mobile'
										type='text'
										placeholder='+91 '
										required='required'
										value={mobile}
										onChange={(e) => setMobile(e.target.value)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										htmlFor='default'
										className='block mb-2 text-sm font-medium text-gray-900 '>
										Organization Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='org_id'
										type='text'
										disabled={true}
										value={user?.payload?.username}
									/>
								</div>
							</div>
							<button
								type='submit'
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								{buttonText}
							</button>
						</form>
					</div>
				</div>
			</PureModal>
		</>
	)
}

export default ParticipantTable
