import * as React from 'react'
import AddQuestion from '../../../components/questions/add_question'
import { QuestionHoc } from '../../../HOC/question_hoc'

const EditQuestionWithContext = QuestionHoc(AddQuestion)

export default function Questions() {
	return <EditQuestionWithContext />
}
