import * as React from 'react'
import AddQuestion from '../../../components/questions/add_question'
import { QuestionHoc } from '../../../hoc/question_hoc'

const EditQuestionWithContext = QuestionHoc(AddQuestion)

export default function EditQuestions({ userId }) {
	return <EditQuestionWithContext userId={userId} />
}
EditQuestions.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
