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
					onClick={() => handleEditClick(level)}
					className={
						'bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'
					}>
					Edit
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(level.id)}
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
