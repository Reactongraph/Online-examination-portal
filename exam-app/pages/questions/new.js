import * as React from 'react'
import AddQuestion from '../../components/questions/addQuestion'
import { QuestionHoc } from '../../components/highOrderComponents/QuestionHoc'

const AddQuestionWithContext = QuestionHoc(AddQuestion)

export default function AddQuestionPage() {
	return <AddQuestionWithContext />
}
