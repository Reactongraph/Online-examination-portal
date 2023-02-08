import React, { useState, useEffect, useContext } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import QuizModal from '../common/form_modals/quiz_modal/quiz_modal'
import { AddQuiz, EditQuiz, GetQuizDataWithId } from '../../apis/quizzes'

import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { LevelContext, ModuleContext } from '../../context/context'

const AddQuizComponent = ({ isViewOnly }) => {
	//For Image Preview
	const { module_data: moduleData } = useContext(ModuleContext)
	const { level_data: levelData } = useContext(LevelContext)

	const router = useRouter()

	const [buttonText, setButtonText] = useState('Add')
	const [name, setName] = useState('')

	const [description, setDescription] = useState('')

	const { handleSubmit } = useForm()
	const [selectedStartDate, setSelectedStartDate] = useState(null)
	const [selectedEndDate, setSelectedEndDate] = useState(null)
	const [selectedBufferDate, setSelectedBufferDate] = useState(null)
	const [optionModuleSelected, setOptionModuleSelected] = useState()
	const [editForm, setEditForm] = useState(false)
	const [selectedLevelId, setSelectedLevelId] = useState('')
	const [selectedModules, setSelectedModules] = useState([])

	useEffect(() => {
		let quiz_id = router.query.id

		async function getQuizData() {
			const results = await GetQuizDataWithId(quiz_id)
			const quizData = results.data[0]

			isViewOnly ? setButtonText('View') : setButtonText('Update')

			let seletedModuleDataArray = []
			let seletedModuleDataArrayByID = []

			// // first find the user with the id

			let singleQuizData = quizData
			setEditForm(true)
			setName(singleQuizData.quiz_name)
			setSelectedLevelId(singleQuizData.level_id)
			setDescription(singleQuizData.description)
			let bufferDate = moment(singleQuizData.buffer_time).toDate()
			let startDate = moment(singleQuizData.start_date).toDate()
			let endDate = moment(singleQuizData.end_date).toDate()

			moduleData?.map((oneModule) => {
				singleQuizData.module_id.map((oneID) => {
					if (oneID == oneModule.id) {
						seletedModuleDataArray.push(oneModule)
						seletedModuleDataArrayByID.push(oneModule.id)
					}
				})
			})
			setSelectedModules(seletedModuleDataArrayByID)
			setOptionModuleSelected(seletedModuleDataArray)
			setSelectedBufferDate(bufferDate)
			setSelectedEndDate(endDate)
			setSelectedStartDate(startDate)
		}

		if (quiz_id) {
			getQuizData()
		}
	}, [router.query?.id])

	const handleLevelTypeSelect = (event) => {
		let levelId = event.target.value
		setSelectedLevelId(levelId)
	}

	const handleModuleTypeSelect = (event) => {
		let moduleSelectedArray = []
		event.map((oneModule) => {
			moduleSelectedArray.push(`${oneModule.id}`)
		})
		setOptionModuleSelected(event)
		setSelectedModules(moduleSelectedArray)
	}

	const checkWithDatabase = async (data) => {
		data.quiz_name = name
		data.start_date = selectedStartDate
		data.end_date = selectedEndDate
		data.buffer_time = selectedBufferDate
		data.level_id = selectedLevelId
		data.description = description
		data.module_id = selectedModules

		//for new data registration

		if (editForm) {
			let QuizData = JSON.stringify(data)
			EditQuiz(QuizData, router.query?.id)
				.then(() => {
					router.replace(`/quiz`)
					toast.success('Quiz updated!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} else {
			data.status = true
			let QuizData = JSON.stringify(data)
			AddQuiz(QuizData)
				.then(() => {
					router.replace(`/quiz`)
					toast.success('Quiz created!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}

	return (
		<>
			<QuizModal
				handleSubmit={handleSubmit}
				checkWithDatabase={checkWithDatabase}
				buttonText={buttonText}
				name={name}
				isViewOnly={isViewOnly || false}
				setName={setName}
				optionModuleSelected={optionModuleSelected}
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
		</>
	)
}

export default AddQuizComponent
