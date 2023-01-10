import Table from '../common/Table'
import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { ModuleColumns } from './ moduleColumns'

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

	// data by using which table data is creating using api call
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={ModuleColumns}
				data={data}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>
			<LevelModulePopup
				setStateName={setModules}
				stateName={modules}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				setModal={setModal}
				modal={modal}
				modalName={'MODULE'}
				buttonText={buttonText}
				placeholderText={'eg. C++ , JAVA ,  etc...'}
			/>

			<ToastContainer />
		</>
	)
}

export default ModuleTable
