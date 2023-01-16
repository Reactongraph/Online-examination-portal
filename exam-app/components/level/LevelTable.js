import Table from '../common/Table'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { Levelcolumns } from './levelColumns'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteLevel, EditLevel } from '../../apis/levels'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const LevelTable = ({ level_data, mutate }) => {
	const router = useRouter()

	const [modal, setModal] = useState(false)
	const [levelId, setLevelId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [level, setLevel] = useState('')

	const { handleSubmit } = useForm()
	const user = useSelector((state) => state?.user)
	const handleRemoveClick = async (level_id) => {
		var shouldDelete = confirm('Do you really want to delete ?')
		if (shouldDelete) {
			DeleteLevel(level_id, user?.token)
				.then(() => {
					router.replace(router.asPath)
					mutate()
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

		EditLevel(new_data, level.id, user?.token)
			.then(() => {
				router.replace(router.asPath)
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
			EditLevel(LevelData, levelId, user?.token)
				.then(() => {
					setModal(!modal)
					router.replace(router.asPath)
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
				<button
					onClick={() => handleEditClick(level)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(level.id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					<input
						onClick={() => handleBoxClick(level)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
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

			<LevelModulePopup
				setStateName={setLevel}
				stateName={level}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				setModal={setModal}
				modal={modal}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
			/>
			<ToastContainer />
		</>
	)
}

export default LevelTable
