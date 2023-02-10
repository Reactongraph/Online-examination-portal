import { QuestionHoc } from '../../hoc/question_hoc'
import AddQuestion from '../../components/questions/add_question'

const ViewQuestionWithContext = QuestionHoc(AddQuestion)

export default function ViewQuestions({ QuestionId }) {
	return (
		<ViewQuestionWithContext
			isViewOnly={true}
			QuestionId={QuestionId}
		/>
	)
}
ViewQuestions.getInitialProps = async ({ query: { id } }) => {
	return {
		QuestionId: id,
	}
}
