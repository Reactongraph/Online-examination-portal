import { QuestionHoc } from '../../hoc/question_hoc'
import AddQuestion from '../../components/questions/add_question'

const ViewQuestionWithContext = QuestionHoc(AddQuestion)

export default function ViewQuestions({ questionId }) {
	return (
		<ViewQuestionWithContext
			isViewOnly={true}
			questionId={questionId}
		/>
	)
}
ViewQuestions.getInitialProps = async ({ query: { id } }) => {
	return {
		questionId: id,
	}
}
