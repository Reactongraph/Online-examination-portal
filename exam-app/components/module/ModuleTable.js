import Table from './Table'
import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import { useRouter } from 'next/router'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'

import { useSelector } from 'react-redux'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const ModuleTable = ({ module_data }) => {
	const router = useRouter()
	const [modal, setModal] = useState(false)
	const [moduleId, setModuleId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [modules, setModules] = useState('')

	const { handleSubmit } = useForm()
	const login_token = useSelector((state) => state.user.token)

	const handleRemoveClick = (module_id) => {
		axios
			.delete(`${SERVER_LINK}/module/${module_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
				toast.success('module deleted!')
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	const handleBoxClick = async (module_id, module_status) => {
		let new_status = {
			status: !module_status,
		}
		new_status = JSON.stringify(new_status)

		await axios
			.patch(`${SERVER_LINK}/module/${module_id}`, new_status, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)

				toast.success('module status updated')
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	const handleEditClick = (module_id) => {
		setButtonText('Update')

		setModuleId(module_id)
		setModal(true)

		// first find the user with the id
		axios
			.get(`${SERVER_LINK}/module/${module_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then((response) => {
				let singleModuleData = response.data

				setModules(singleModuleData.module)
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	const checkWithDatabase = async (data) => {
		data.module = modules
		let moduleData = JSON.stringify(data)

		// for taking the patch api data
		if (data.module != null && data.module != '') {
			await axios
				.patch(`${SERVER_LINK}/module/${moduleId}`, moduleData, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: login_token,
					},
				})
				.then(() => {
					setModal(!modal)
					router.replace(router.asPath)
					toast.success('module updated!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		} else {
			toast.error("Field Can't be empty ")
		}
	}

	function createData(modules, module_id, module_status) {
		const action = (
			<>
				<button
					onClick={() => handleEditClick(module_id)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(module_id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					<input
						onClick={() => handleBoxClick(module_id, module_status)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-gray-300 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						defaultChecked={module_status}
					/>
				</div>
			</>
		)
		return { modules, status, action }
	}

	const rowsDataArray = module_data.map((element) => {
		let modules = element.module

		let module_id = element.id
		let module_status = element.status

		return createData(modules, module_id, module_status)
	})

	const columns = [
		{
			Header: 'Module',
			accessor: 'modules',
			title: 'Module',
			dataIndex: 'modules',
			key: 'module',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
			rowClassName: 'bg-black-ripon',
		},

		{
			Header: 'Status',
			accessor: 'status',
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
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

	// data by using which table data is creating using api call
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={columns}
				data={data}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
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
						<p>{buttonText} Module</p>
					</div>

					<div className='py-6 px-6 lg:px-8'>
						<form
							className='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-first-name'>
										Enter Module
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='grid-level'
										type='text'
										value={modules}
										onChange={(e) => setModules(e.target.value)}
										placeholder='e.g. C++, JAVA '
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
			<ToastContainer />
		</>
	)
}

export default ModuleTable
