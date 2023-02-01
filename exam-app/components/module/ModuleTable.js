import Table from '../common/Table'
import React from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { ModuleColumns } from './ moduleColumns'
import { useRouter } from 'next/router'

import { DeleteModule, EditModule } from '../../apis/modules'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { BsPencilSquare } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'

const ModuleTable = ({ data: module_data, mutate }) => {
	const router = useRouter()

	const handleRemoveClick = (module_id) => {
		try {
			DeleteModule(module_id)
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
		EditModule(new_data, modules.id)
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
		router.push(`${router.asPath}/edit/${module.id}`)
	}
	const handleViewClick = async (module) => {
		router.push(`${router.asPath}/${module.id}`)
	}

	function createData(modules) {
		const action = (
			<>
				<ButtonComponent
					className='btn-view'
					onClick={() => handleViewClick(modules)}>
					<AiFillEye className='h-6 w-6 ' />
				</ButtonComponent>
				<ButtonComponent
					onClick={() => handleEditClick(modules)}
					className='btn-edit'>
					<BsPencilSquare className='h-6 w-5 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(modules.id)}
					className={'btn-delete'}>
					<MdDelete className='h-6 w-7'></MdDelete>
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

	return (
		<>
			<Table
				columns={ModuleColumns}
				data={rowsDataArray || []}
				rowKey='id'
				className='table-primary'
			/>

			<ToastContainer />
		</>
	)
}

export default ModuleTable
