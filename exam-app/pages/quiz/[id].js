import AddQuizComponent from '../../components/quiz/add_quiz'
import { QuizHoc } from '../../hoc/quiz_hoc'

const ViewQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function ViewQuiz({ quizId }) {
	return (
		<ViewQuizWithContext
			isViewOnly={true}
			buttonText={'View'}
			quizId={quizId}
		/>
	)
}
ViewQuiz.getInitialProps = async ({ query: { id } }) => {
	return {
		quizId: id,
	}
}
