import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteQuiz, EditQuiz } from '../../apis/quizzes'
import QuizPopUp from '../common/PopUpModals/quizPopUp/QuizPopup'
import Table from '../common/Table'
import QuizDataArray from './QuizDataArray'
import { QuizColumns } from './quizColumn'
import { QuizContext } from '../context'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const QuizTable = () => {
	const { module_data, level_data, mutate, quiz_data } = useContext(QuizContext)

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

	const { handleSubmit } = useForm()

	const handleLevelTypeSelect = (event) => {
		let levelId = event.target.value
		setSelectedLevelId(levelId)
	}

	const handleRemoveClick = (quiz_id) => {
		DeleteQuiz(quiz_id)
			.then(() => {
				mutate()
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
		EditQuiz(new_status, quiz_id)
			.then(() => {
				mutate()
				toast.success('Quiz updated Successfully!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleEditClick = async (quiz_id, oneRowData) => {
		setButtonText('Update')

		setQuizId(quiz_id)
		setModal(true)
		let seletedModuleDataArray = []

		// first find the user with the id

		let singleQuizData = oneRowData
		setName(singleQuizData.quiz_name)
		setSelectedLevelId(singleQuizData.level_id)
		setDescription(singleQuizData.description)
		let bufferDate = moment(singleQuizData.buffer_time).toDate()
		let startDate = moment(singleQuizData.start_date).toDate()
		let endDate = moment(singleQuizData.end_date).toDate()
		moduleData?.map((oneModule) => {
			singleQuizData.module_id.map((oneID) => {
				if (oneID.$oid == oneModule.id) {
					seletedModuleDataArray.push(oneModule)
				}
			})
		})
		setOptionModuleSelected(seletedModuleDataArray)
		setSelectedBufferDate(bufferDate)
		setSelectedEndDate(endDate)
		setSelectedStartDate(startDate)
	}

	const checkWithDatabase = async (data) => {
		data.quiz_name = name
		data.start_date = selectedStartDate
		data.end_date = selectedEndDate
		data.buffer_time = selectedBufferDate
		data.level_id = selectedLevelId
		data.description = description
		data.module_id = selectedModules
		EditQuiz(data, quizId)
			.then(() => {
				mutate()
				setModal(!modal)

				router.replace(router.asPath)
				toast.success('Quiz updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	// data by using which table data is creating using api call
	const data = QuizDataArray(
		quiz_data,
		handleEditClick,
		handleBoxClick,
		handleRemoveClick
	)

	return (
		<>
			<Table
				columns={QuizColumns}
				data={data || []}
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
				optionModuleSelected={optionModuleSelected}
				// selectedModules={optionModuleSelected}
				// setSelectedModules={setOptionModuleSelected}
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
