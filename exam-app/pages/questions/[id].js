import { QuestionHoc } from '../../hoc/question_hoc'
import AddQuestion from '../../components/questions/add_question'

const ViewQuestionWithContext = QuestionHoc(AddQuestion)

export default function ViewQuestions({ userId }) {
	return (
		<ViewQuestionWithContext
			isViewOnly={true}
			userId={userId}
		/>
	)
}
ViewQuestions.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
