import Table from '../common/table'
import React from 'react'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { Levelcolumns } from './level_columns'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteLevel, EditLevel } from '../../apis/levels'
import { CheckboxInput } from '../common/micro/check_box_input'
import { ButtonComponent } from '../common/micro/button_component'
import { BsPencilSquare } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'

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
					className={`btn-view`}
					onClick={() => handleViewClick(level)}>
					<AiFillEye className='h-6 w-7 ' />
				</ButtonComponent>
				<ButtonComponent
					onClick={() => handleEditClick(level)}
					className={'btn-edit'}>
					<BsPencilSquare className='h-6 w-5 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(level.id)}
					className={'btn-delete'}>
					<MdDelete className='h-6 w-7'></MdDelete>
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
				className='table-primary'
			/>

			<ToastContainer />
		</>
	)
}

export default LevelTable
