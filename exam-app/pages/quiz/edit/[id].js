import AddQuizComponent from '../../../components/quiz/add_quiz'
import { QuizHoc } from '../../../hoc/quiz_hoc'

const EditQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function EditQuiz({ quizId }) {
	return (
		<EditQuizWithContext
			buttonText={'Edit'}
			isEdit={true}
			quizId={quizId}
		/>
	)
}
EditQuiz.getInitialProps = async ({ query: { id } }) => {
	return {
		quizId: id,
	}
}
