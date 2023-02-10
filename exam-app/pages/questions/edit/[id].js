import * as React from 'react'
import AddQuestion from '../../../components/questions/add_question'
import { QuestionHoc } from '../../../hoc/question_hoc'

const EditQuestionWithContext = QuestionHoc(AddQuestion)

export default function EditQuestions({ QuestionId }) {
	return <EditQuestionWithContext QuestionId={QuestionId} />
}
EditQuestions.getInitialProps = async ({ query: { id } }) => {
	return {
		QuestionId: id,
	}
}
