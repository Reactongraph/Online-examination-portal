import AddQuizComponent from '../../../components/quiz/add_quiz'
import { QuizHoc } from '../../../hoc/quiz_hoc'

const EditQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function EditQuiz({ QuizId }) {
	return (
		<EditQuizWithContext
			buttonText={'Edit'}
			editform={true}
			QuizId={QuizId}
		/>
	)
}
EditQuiz.getInitialProps = async ({ query: { id } }) => {
	return {
		QuizId: id,
	}
}
