import Table from '../common/Table'
import React from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { ModuleColumns } from './ moduleColumns'
import { useRouter } from 'next/router'

import { DeleteModule, EditModule } from '../../apis/modules'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { EyeIcon, ArchiveIcon } from '@heroicons/react/solid'
import { BsPencilSquare } from 'react-icons/bs'

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
					className={`text-blue-500 hover:text-blue-700`}
					onClick={() => handleViewClick(modules)}>
					<EyeIcon className='h-6 h-6 ' />
				</ButtonComponent>
				<ButtonComponent
					onClick={() => handleEditClick(modules)}
					className={'text-green-500 hover:text-green-700 ml-2'}>
					<BsPencilSquare className='h-6 w-5 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(modules.id)}
					className={'text-red-500 hover:text-red-700  m-1'}>
					<ArchiveIcon className='h-6 h-6'></ArchiveIcon>
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
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>

			<ToastContainer />
		</>
	)
}

export default ModuleTable
