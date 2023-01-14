import Table from '../common/Table'
import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { ModuleColumns } from './ moduleColumns'

import { useSelector } from 'react-redux'
import { DeleteModule, EditModule, GetModuleDataWithId } from '../../apis/modules'

const ModuleTable = ({ module_data, mutate }) => {
	const router = useRouter()
	const [modal, setModal] = useState(false)
	const [moduleId, setModuleId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [modules, setModules] = useState('')

	const { handleSubmit } = useForm()
	const login_token = useSelector((state) => state.user.token)
	const user = useSelector((state) => state?.user)

	const handleRemoveClick = (module_id) => {
		try {
			DeleteModule(module_id, user?.token)
			mutate()
			toast.success('Module deleted!')
		} catch (error) {
			toast.error('invalid request')
		}
	}

	const handleBoxClick =(module_id, module_status) => {
		let new_status = {
			status: !module_status,
		}
		new_status = JSON.stringify(new_status)
		EditModule(module_data,module_id, user?.token)
			.then(() => {
				setModal(!modal)
				mutate()
				toast.success('organization updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleEditClick = async (module) => {
		setButtonText('Update')
		setModuleId(module.id)
		setModal(true)
		setModules(module.module)
	}

	const checkWithDatabase = async (data) => {
		data.module = modules
		let moduleData = JSON.stringify(data)


		// for taking the patch api data
		if (data.module != null && data.module != '') {
			EditModule(moduleData, moduleId, user?.token)
			.then(() => {
				setModal(!modal)
				toast.success('updated!')

			})
			.catch(() => {
				toast.error('invalid request')
			})
		} else {
			toast.error("Field Can't be empty ")
		}
	}

	function createData(modules) {
		const action = (
			<>
				<button
					onClick={() => handleEditClick(modules)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(modules.id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					<input
						onClick={() => handleBoxClick(modules.id, modules.status)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-gray-300 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						defaultChecked={modules.status}
					/>
				</div>
			</>
		)
		return {
			modules: modules.module,
			status: status,
			action,
		}
	}
	const rowsDataArray = module_data?.map((element) => {
		let modules = element.module

		let module_id = element.id
		let module_status = element.status

		return createData(element)
	})
	// data by using which table data is creating using api call
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={ModuleColumns}
				data={data || []}
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
				module={module}
				placeholderText={'eg. C++ , JAVA ,  etc...'}
			/>

			<ToastContainer />
		</>
	)
}

export default ModuleTable
