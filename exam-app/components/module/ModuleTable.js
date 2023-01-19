import Table from '../common/Table'
import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { ModuleColumns } from './ moduleColumns'

import { useSelector } from 'react-redux'
import { DeleteModule, EditModule } from '../../apis/modules'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'

const ModuleTable = ({ module_data, mutate }) => {
	const [modal, setModal] = useState(false)
	const [moduleId, setModuleId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [modules, setModules] = useState('')

	const { handleSubmit } = useForm()
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

	const handleBoxClick = (modules) => {
		let oldStatus = modules.status
		let new_data = {
			module: modules?.module,
			status: !oldStatus,
		}
		new_data = JSON.stringify(new_data)
		EditModule(new_data, modules.id, user?.token)
			.then(() => {
				// setModal(!modal)
				mutate()
				toast.success('module updated!')
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
					mutate()
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
				<ButtonComponent
					onClick={() => handleEditClick(modules)}
					className={
						'bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'
					}>
					Edit
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(modules.id)}
					className={
						'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
					}>
					Delete
				</ButtonComponent>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					<CheckboxInput
						onClick={() => handleBoxClick(modules)}
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
