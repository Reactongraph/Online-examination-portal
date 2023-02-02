import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import OptionType from './questionForm/OptionType'
import QuestionForm from './questionForm/QuestionForm'
import QuestionLevel from './questionForm/QuestionLevel'
import QuestionMarks from './questionForm/QuestionMarks'
import TimeLimit from './questionForm/TimeLimit'
import QuestionType from './questionForm/QuestionType'
import QuestionModule from './questionForm/QuestionModule'

import {
	Addquestion,
	EditQuestion,
	GetQuestionDataWithId,
} from '../../apis/questions'
import { LevelContext, ModuleContext } from '../context/context'
// import { QuestionContext } from '../context'

const AddQuestion = ({ isViewOnly }) => {
	const { module_data: moduleData } = useContext(ModuleContext)
	const { level_data: levelData } = useContext(LevelContext)

	// const {level_data: levelData}
	const router = useRouter()
	const [selectedImage, setSelectedImage] = useState(null)
	const [pageTitle, setPageTitle] = useState('Add')
	const [question, setQuestion] = useState('')
	const [optionType, setOptionType] = useState('Single')
	const [questionType, setQuestionType] = useState('')
	const [selectedLevelId, setSelectedLevelId] = useState('')
	const [selectedModuleId, setSelectedModuleId] = useState('')
	const [timeLimitSelect, setTimeLimitSelect] = useState('')
	const [requiredOptionField, setRequiredOptionField] = useState(true)
	const [marks, setMarks] = useState()
	const [numberOfOptionSelect, setNumberOfOptionSelect] = useState(0)
	const [selectedOptionIndex, setSelectedOptionIndex] = useState()
	const [editForm, setEditForm] = useState(false)
	const [inputFields, setInputFields] = useState([
		{ option: '', correct: '' },
		{ option: '', correct: '' },
		{ option: '', correct: '' },
		{ option: '', correct: '' },
	])

	useEffect(() => {
		let question_id = router.query?.id

		async function getQuestionData() {
			const results = await GetQuestionDataWithId(question_id)
			const questionData = results.data
			isViewOnly ? setPageTitle('View') : setPageTitle('Edit')
			setEditForm(true)
			setQuestion(questionData.question)
			setInputFields(questionData.options)
			questionData.options.map((one, index) => {
				if (questionData.option_type == 'Single') {
					if (one.correct) {
						setNumberOfOptionSelect(numberOfOptionSelect + 1)
						setSelectedOptionIndex(index)
					}
				} else {
					if (one.correct) setNumberOfOptionSelect(numberOfOptionSelect + 1)
				}
			})
			setQuestionType(questionData.question_type)
			setTimeLimitSelect(questionData.question_time)
			setOptionType(questionData.option_type)
			setSelectedLevelId(questionData?.level?.id)
			setSelectedModuleId(questionData?.module?.id)

			setMarks(questionData.marks)
			setEditForm(true)
		}

		if (router.query?.id) {
			getQuestionData()
			// console.log()
		}
	}, [router.query?.id])

	const { handleSubmit } = useForm()

	useEffect(() => {
		if (numberOfOptionSelect > 0) {
			setRequiredOptionField(false)
		} else {
			setRequiredOptionField(true)
		}
	}, [numberOfOptionSelect])
	const handleSelectedOption = (index, event) => {
		if (optionType == 'Single') {
			inputFields.map((one, i) => {
				if (index != i) one.correct = false
			})
		}

		if (!event.target.checked) {
			setNumberOfOptionSelect(numberOfOptionSelect - 1)
		}
		if (optionType == 'Single') {
			setSelectedOptionIndex(index)
		}

		let data = [...inputFields]
		data[index].correct = event.target.checked
		setInputFields(data)

		if (optionType == 'Multiple') {
			inputFields.map((oneObj) => {
				if (oneObj.correct == true)
					setNumberOfOptionSelect(numberOfOptionSelect + 1)
			})
		} else {
			setNumberOfOptionSelect(1)
		}
	}
	const handleModuleTypeSelect = (event) => {
		let moduleId = event.target.value
		setSelectedModuleId(moduleId)
	}

	const handleLevelTypeSelect = (event) => {
		let levelId = event.target.value
		setSelectedLevelId(levelId)
	}

	const handleOptionTypeSelect = (event) => {
		let optionType = event.target.value
		setOptionType(optionType)
	}

	const handleTimeLimitSelect = (event) => {
		let timeLimitValue = event.target.value
		setTimeLimitSelect(timeLimitValue)
	}
	const handleQuestionTypeSelect = (event) => {
		let questionTypeValue = event.target.value
		setQuestionType(questionTypeValue)
	}

	const handleFormChange = async (index, event) => {
		let data = [...inputFields]
		data[index].option = event.target.value
		setInputFields(data)
	}

	const addFields = () => {
		let newfield = { option: '', correct: '' }
		setInputFields([...inputFields, newfield])
	}

	const removeFields = (index) => {
		let data = [...inputFields]
		data[index].option = ''
		data.splice(index, 1)
		setInputFields(data)
	}

	const checkWithDatabase = async (data) => {
		data.question_type = questionType
		data.question = question
		data.marks = marks
		data.question_time = timeLimitSelect

		data.level_id = selectedLevelId
		data.module_id = selectedModuleId
		data.option_type = optionType
		if (optionType != 'Multiple') {
			data.options = inputFields
			data.options.map((oneOption, i) => {
				if (selectedOptionIndex == i) oneOption.correct = true
				else oneOption.correct = false
			})
		} else {
			data.options = inputFields
			data.options.map((oneOption) => {
				if (!oneOption.correct) oneOption.correct = false
			})
		}

		if (editForm) {
			let question_id = router.query?.id
			data = JSON.stringify(data)
			EditQuestion(data, question_id)
				.then(() => {
					router.push('/questions')
				})
				.catch(() => {
					toast.error('invalid requests')
				})
		} else {
			data.status = true
			data = JSON.stringify(data)
			Addquestion(data)
				.then(() => {
					router.push('/questions')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}

	return (
		<>
			{' '}
			<main>
				{/* question side */}

				<QuestionForm
					handleSubmit={handleSubmit}
					checkWithDatabase={checkWithDatabase}
					pageTitle={pageTitle}
					selectedImage={selectedImage}
					handleSelectedOption={handleSelectedOption}
					setSelectedImage={setSelectedImage}
					removeFields={removeFields}
					question={question}
					setQuestion={setQuestion}
					inputFields={inputFields}
					handleFormChange={handleFormChange}
					addFields={addFields}
					optionType={optionType}
					requiredOptionField={requiredOptionField}
					isViewOnly={isViewOnly || false}>
					<React.Fragment>
						<QuestionType
							questionType={questionType}
							handleQuestionTypeSelect={handleQuestionTypeSelect}
							isViewOnly={isViewOnly}
						/>
						<TimeLimit
							timeLimitSelect={timeLimitSelect}
							handleTimeLimitSelect={handleTimeLimitSelect}
							isViewOnly={isViewOnly}
						/>
						<OptionType
							optionType={optionType}
							handleOptionTypeSelect={handleOptionTypeSelect}
							isViewOnly={isViewOnly}
						/>
						<QuestionLevel
							selectedLevelId={selectedLevelId}
							handleLevelTypeSelect={handleLevelTypeSelect}
							levelData={levelData}
							isViewOnly={isViewOnly}
						/>
						<QuestionModule
							moduleData={moduleData}
							handleModuleTypeSelect={handleModuleTypeSelect}
							selectedModuleId={selectedModuleId}
							isViewOnly={isViewOnly}
						/>
						<QuestionMarks
							marks={marks}
							setMarks={setMarks}
							isViewOnly={isViewOnly}
						/>
					</React.Fragment>
				</QuestionForm>
			</main>
		</>
	)
}

export default AddQuestion
