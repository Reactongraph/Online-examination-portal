import React, { useState } from 'react'
import Table from './Table'
// import Pagination from 'react-js-pagination'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SERVER_LINK } from '../../helpers/config'
// import PageComponentTitle from '../common/PageComponentTitle'
// import ParticipantModal from '../common/ParticipantModal'
import { useForm } from 'react-hook-form'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
// import { login_token } from '../login'
import { useSelector } from 'react-redux'

const ParticipantTable = ({ participant_data }) => {
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
			.catch((err) => {
				return err
			})
	}

	const handleEditClick = async (participantId) => {
		// setOpen(true);
		setModal(true)
		// setButtonText('Update')
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
			.catch((err) => {
				return err
			})
	}

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile
		data.Organization_id = organizationId
		data.password = password

		// data.status = true;
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
				})
				.catch((err) => {
					return err
				})
		}

		// for new data registration
		else {
			await axios({
				url: `${SERVER_LINK}/participants`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
				data,
			})
				.then(() => {
					router.replace(router.asPath)
					setModal(!modal)
				})
				.catch((err) => {
					return err
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

	const columns = [
		{
			Header: 'Name',
			accessor: 'name',
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
			rowClassName: 'bg-black-ripon',
		},
		{
			Header: 'Email',
			accessor: 'email',
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 400,
			className: 'text-white bg-gray-600 p-2 border-r-2 border-b-2',
		},
		{
			Header: 'Mobile',
			accessor: 'mobile',
			title: 'Mobile',
			dataIndex: 'mobile',
			key: 'mobile',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
		},
		{
			Header: 'Action',
			accessor: 'action',
			title: 'Action',
			dataIndex: 'action',
			key: 'operations',
			width: 250,
			className: 'text-white bg-gray-600 p-2 border-b-2',
		},
	]

	const data = rowsDataArray
	//Pagination
	// const [activePage, setActivePage] = useState(15)
	// const handlePageChange = (pageNumber) => {
	// 	setActivePage(pageNumber)
	// }

	return (
		<>
			<Table
				columns={columns}
				data={data}
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
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='password'
										type='password'
										placeholder='******************'
										required='required'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you'd like
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
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='grid-last-name'>
										Organization Id
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='org_id'
										type='text'
										placeholder='e.g. 1000'
										required='required'
										value={organizationId}
										onChange={(e) => setOrganizationId(e.target.value)}
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

					{/* */}
				</div>
			</PureModal>
		</>
	)
}

export default ParticipantTable
