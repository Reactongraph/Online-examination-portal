import React from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import QuizPage from '../common/form_modals/quiz_modal/quiz_page'
import { AddQuiz, EditQuiz } from '../../apis/quizzes'

import 'react-datepicker/dist/react-datepicker.css'
import useCheckWithDatabase from '../common/database_function'

const AddQuizComponent = ({ isViewOnly, isEdit, buttonText, quizId }) => {
	//For Image Preview

	const handleModuleData = (event) => {
		// function is created to create an array of module ID only from the array of selected module data object
		let moduleSelectedArray = []
		event.map((oneModule) => {
			moduleSelectedArray.push(`${oneModule.id}`)
		})

		return moduleSelectedArray
	}

	const checkWithDatabase = useCheckWithDatabase(
		isEdit ? EditQuiz : AddQuiz,
		isEdit ? 'Quiz updated!' : 'Quiz created!',
		'/quiz'
	)

	const handleQuizData = async (data) => {
		data.module_id = handleModuleData(data.module_id)
		delete data.Org_name
		data.status = true
		const QuizData = JSON.stringify(data)
		const id = isEdit ? quizId : null
		await checkWithDatabase(QuizData, id)
	}

	return (
		<>
			<QuizPage
				handleQuizData={handleQuizData}
				buttonText={buttonText}
				isViewOnly={isViewOnly || false}
				quizId={quizId}
			/>
		</>
	)
}

export default AddQuizComponent
