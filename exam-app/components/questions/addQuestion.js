import React, { useState, useEffect } from 'react'
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
import { useSelector } from 'react-redux'

const AddQuestion = ({ level_data: levelData, module_data: moduleData }) => {
	const user = useSelector((state) => state?.user)
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
	// const data = useCookie(props.cookie)
	// let cookie = data.get('refresh_token') || ''

	useEffect(() => {
		let question_id = router.query.question_id

		async function getQuestionData() {
			const results = await GetQuestionDataWithId(user?.token, question_id)
			const questionData = results.data
			setPageTitle('Edit')
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

		if (router.query.question_id) {
			getQuestionData()
		}
	}, [router.query?.question_id])
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
			let question_id = router.query.question_id
			data = JSON.stringify(data)
			EditQuestion(data, question_id, user?.token)
				.then(() => {
					router.push('/dashboard/questions')
				})
				.catch(() => {
					toast.error('invalid requestssss')
				})
		} else {
			data.status = true
			data = JSON.stringify(data)
			Addquestion(data, user?.token)
				.then(() => {
					router.push('/dashboard/questions')
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
					requiredOptionField={requiredOptionField}>
					<React.Fragment>
						<QuestionType
							questionType={questionType}
							handleQuestionTypeSelect={handleQuestionTypeSelect}
						/>
						<TimeLimit
							timeLimitSelect={timeLimitSelect}
							handleTimeLimitSelect={handleTimeLimitSelect}
						/>
						<OptionType
							optionType={optionType}
							handleOptionTypeSelect={handleOptionTypeSelect}
						/>
						<QuestionLevel
							selectedLevelId={selectedLevelId}
							handleLevelTypeSelect={handleLevelTypeSelect}
							levelData={levelData}
						/>
						<QuestionModule
							moduleData={moduleData}
							handleModuleTypeSelect={handleModuleTypeSelect}
							selectedModuleId={selectedModuleId}
						/>
						<QuestionMarks
							marks={marks}
							setMarks={setMarks}
						/>
					</React.Fragment>
				</QuestionForm>
			</main>
		</>
	)
}

export default AddQuestion
