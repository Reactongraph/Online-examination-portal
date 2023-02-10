import React from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import QuizModal from '../common/form_modals/quiz_modal/quiz_modal'
import { AddQuiz, EditQuiz } from '../../apis/quizzes'

import 'react-datepicker/dist/react-datepicker.css'

const AddQuizComponent = ({ isViewOnly, editform, buttonText, QuizId }) => {
	//For Image Preview

	const router = useRouter()

	const handleModuleData = (event) => {
		// function is created to create an array of module ID only from the array of selected module data object
		let moduleSelectedArray = []
		event.map((oneModule) => {
			moduleSelectedArray.push(`${oneModule.id}`)
		})

		return moduleSelectedArray
	}

	const checkWithDatabase = async (data) => {
		data.module_id = handleModuleData(data.module_id)
		delete data.Org_name

		//for new data registration

		if (editform) {
			let QuizData = JSON.stringify(data)
			EditQuiz(QuizData, QuizId)
				.then(() => {
					toast.success('Quiz updated!')
					router.replace(`/quiz`)
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
				checkWithDatabase={checkWithDatabase}
				buttonText={buttonText}
				isViewOnly={isViewOnly || false}
				QuizId={QuizId}
			/>
		</>
	)
}

export default AddQuizComponent
