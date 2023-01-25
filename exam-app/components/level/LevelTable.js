import Table from '../common/Table'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
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

	const [modal, setModal] = useState(false)
	const [levelId, setLevelId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [level, setLevel] = useState('')

	const { handleSubmit } = useForm()
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
		setButtonText('Update')
		setLevelId(level.id)
		setModal(true)
		setLevel(level.level)
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
	const checkWithDatabase = async (data) => {
		data.level = level

		let LevelData = JSON.stringify(data)

		// for taking the patch api data

		if (data.level != null && data.level != '') {
			EditLevel(LevelData, levelId)
				.then(() => {
					setModal(!modal)
					router.replace(router.asPath)
					mutate()
					toast.success('level updated!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		} else {
			toast.error("Field Can't be empty ")
		}
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
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={Levelcolumns}
				data={data || []}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>

			{/* <LevelModulePopup
				setStateName={setLevel}
				stateName={level}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				setModal={setModal}
				modal={modal}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
			/> */}
			<ToastContainer />
		</>
	)
}

export default LevelTable
