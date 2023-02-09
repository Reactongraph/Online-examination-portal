import AddQuizComponent from '../../../components/quiz/add_quiz'
import { QuizHoc } from '../../../hoc/quiz_hoc'

const EditQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function EditQuiz({ userId }) {
	return (
		<EditQuizWithContext
			buttonText={'Edit'}
			editform={true}
			userId={userId}
		/>
	)
}
EditQuiz.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
