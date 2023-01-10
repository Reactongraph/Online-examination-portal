import Table from '../common/Table'
import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { QuizColumns } from './quizColumn'
import QuizPopUp from '../common/PopUpModals/quizPopUp/QuizPopup'
// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const QuizTable = ({ quiz_data, module_data, level_data }) => {
	const router = useRouter()

	const [modal, setModal] = useState(false)
	const [quizId, setQuizId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [name, setName] = useState('')
	const levelData = level_data
	const moduleData = module_data

	const [selectedLevelId, setSelectedLevelId] = useState('')
	const [description, setDescription] = useState('')
	const [selectedBufferDate, setSelectedBufferDate] = useState(null)
	const [selectedStartDate, setSelectedStartDate] = useState(null)
	const [selectedEndDate, setSelectedEndDate] = useState(null)
	const [optionModuleSelected, setOptionModuleSelected] = useState()
	const [selectedModules, setSelectedModules] = useState()

	const login_token = useSelector((state) => state.user.token)

	const { handleSubmit } = useForm()

	const handleLevelTypeSelect = (event) => {
		let levelId = event.target.value
		setSelectedLevelId(levelId)
	}

	const handleRemoveClick = (quiz_id) => {
		axios
			.delete(`${SERVER_LINK}/quiz/${quiz_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
				toast.success('Quiz deleted!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleModuleTypeSelect = (event) => {
		let moduleSelectedArray = []
		setOptionModuleSelected(event)
		event.map((oneModule) => {
			moduleSelectedArray.push(`${oneModule.id}`)
		})

		setSelectedModules(moduleSelectedArray)
	}

	const handleBoxClick = async (quiz_id, quiz_status) => {
		let new_status = {
			status: !quiz_status,
		}
		new_status = JSON.stringify(new_status)
		await axios
			.patch(`${SERVER_LINK}/quiz/${quiz_id}`, new_status, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleEditClick = async (quiz_id) => {
		setButtonText('Update')
		// setEditForm(true)
		setQuizId(quiz_id)
		setModal(true)
		let seletedModuleDataArray = []

		// first find the user with the id
		await axios
			.get(`${SERVER_LINK}/quiz/find/${quiz_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then((response) => {
				let singleQuizData = response.data[0]
				setName(singleQuizData.quiz_name)
				setSelectedLevelId(singleQuizData.level_id)
				setDescription(singleQuizData.description)
				let bufferDate = moment(singleQuizData.buffer_time).toDate()
				let startDate = moment(singleQuizData.start_date).toDate()
				let endDate = moment(singleQuizData.end_date).toDate()

				moduleData.map((oneModule) => {
					singleQuizData.module_id.map((oneID) => {
						if (oneID == oneModule.id) {
							seletedModuleDataArray.push(oneModule)
						}
					})
				})
				setOptionModuleSelected(seletedModuleDataArray)
				setSelectedBufferDate(bufferDate)
				setSelectedEndDate(endDate)
				setSelectedStartDate(startDate)
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const checkWithDatabase = async (data) => {
		data.quiz_name = name
		data.start_date = selectedStartDate
		data.end_date = selectedEndDate
		data.buffer_time = selectedBufferDate
		data.level_id = selectedLevelId
		data.description = description
		data.module_id = selectedModules

		// let QuizData = JSON.stringify(data)
		await axios
			.patch(`${SERVER_LINK}/quiz/${quizId}`, data, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				setModal(!modal)
				router.replace(router.asPath)
				toast.success('Quiz updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	function createData(
		quiz,
		quiz_id,
		quiz_status,
		modules,
		level,
		end_date,
		start_date
	) {
		const action = (
			<>
				<button
					onClick={() => handleEditClick(quiz_id)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(quiz_id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					<input
						onClick={() => handleBoxClick(quiz_id, quiz_status)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-gray-300 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						defaultChecked={quiz_status}
					/>
				</div>
			</>
		)
		return { quiz, status, action, modules, level, end_date, start_date }
	}

	const rowsDataArray = quiz_data.map((element) => {
		let quiz = element.quiz_name
		let quiz_id = element._id.$oid
		let quiz_status = element.status
		let moduleNameArray = []
		let moduleArray = element.module
		moduleArray.map((oneModule) => {
			moduleNameArray.push(oneModule.module)
		})

		let modules = moduleNameArray.join()
		let { level } = element.level
		let start_date = element.start_date.$date
		start_date = moment(start_date).format('llll')

		let end_date = element.end_date.$date
		end_date = moment(end_date).format('llll')

		return createData(
			quiz,
			quiz_id,
			quiz_status,
			modules,
			level,
			end_date,
			start_date
		)
	})

	// data by using which table data is creating using api call
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={QuizColumns}
				data={data}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>

			<QuizPopUp
				handleSubmit={handleSubmit}
				checkWithDatabase={checkWithDatabase}
				buttonText={buttonText}
				name={name}
				setName={setName}
				modal={modal}
				setModal={setModal}
				selectedLevelId={selectedLevelId}
				setSelectedLevelId={setSelectedLevelId}
				selectedModules={selectedModules}
				setSelectedModules={setSelectedModules}
				selectedStartDate={selectedStartDate}
				setSelectedStartDate={setSelectedStartDate}
				selectedBufferDate={selectedBufferDate}
				setSelectedBufferDate={setSelectedBufferDate}
				selectedEndDate={selectedEndDate}
				setSelectedEndDate={setSelectedEndDate}
				handleLevelTypeSelect={handleLevelTypeSelect}
				handleModuleTypeSelect={handleModuleTypeSelect}
				description={description}
				setDescription={setDescription}
				moduleData={moduleData}
				levelData={levelData}
			/>
			<ToastContainer />
		</>
	)
}

export default QuizTable
