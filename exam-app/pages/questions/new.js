import * as React from 'react'
import AddQuestion from '../../components/questions/add_question'
import { QuestionHoc } from '../../HOC/question_hoc'

const AddQuestionWithContext = QuestionHoc(AddQuestion)

export default function AddQuestionPage() {
	return <AddQuestionWithContext />
}
