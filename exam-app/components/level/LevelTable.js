import Table from '../common/Table'
import React from 'react'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { Levelcolumns } from './levelColumns'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteLevel, EditLevel } from '../../apis/levels'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { EyeIcon, ArchiveIcon } from '@heroicons/react/solid'
import { BsPencilSquare } from 'react-icons/bs'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const LevelTable = ({ data: level_data, mutate }) => {
	const router = useRouter()

	const handleRemoveClick = async (level_id) => {
		var shouldDelete = confirm('Do you really want to delete ?')
		if (shouldDelete) {
			DeleteLevel(level_id)
				.then(() => {
					router.replace(router.asPath)
					mutate()
					toast.success('level deleted!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}

	const handleEditClick = async (level) => {
		router.push(`${router.asPath}/edit/${level.id}`)
	}
	const handleViewClick = async (level) => {
		router.push(`${router.asPath}/${level.id}`)
	}
	const handleBoxClick = async (level) => {
		let oldStatus = level.status
		let new_data = {
			level: level?.level,
			status: !oldStatus,
		}
		new_data = JSON.stringify(new_data)

		EditLevel(new_data, level.id)
			.then(() => {
				router.replace(router.asPath)
				mutate()
				toast.success('level updated!')
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	function createData(level) {
		const action = (
			<>
				<ButtonComponent
					className={`text-blue-500 hover:text-blue-700`}
					onClick={() => handleViewClick(level)}>
					<EyeIcon className='h-6 h-6 ' />
				</ButtonComponent>
				<ButtonComponent
					onClick={() => handleEditClick(level)}
					className={'text-green-500 hover:text-green-700 ml-2'}>
					<BsPencilSquare className='h-6 w-5 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(level.id)}
					className={'text-red-500 hover:text-red-700  m-1'}>
					<ArchiveIcon className='h-6 h-6'></ArchiveIcon>
				</ButtonComponent>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					<CheckboxInput
						onClick={() => handleBoxClick(level)}
						defaultChecked={level.status}
					/>
				</div>
			</>
		)
		return {
			level: level.level,
			status: status,
			action,
		}
	}

	const rowsDataArray = level_data?.map((element) => {
		return createData(element)
	})

	// data by using which table data is creating using api call

	return (
		<>
			<Table
				columns={Levelcolumns}
				data={rowsDataArray || []}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>

			<ToastContainer />
		</>
	)
}

export default LevelTable
