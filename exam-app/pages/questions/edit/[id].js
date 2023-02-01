import * as React from 'react'
import AddQuestion from '../../../components/questions/addQuestion'
import { QuestionHoc } from '../../../components/highOrderComponents/QuestionHoc'

const EditQuestionWithContext = QuestionHoc(AddQuestion)

export default function Questions() {
	return <EditQuestionWithContext />
}
