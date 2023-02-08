import AddQuizComponent from '../../components/quiz/add_quiz'
import { QuizHoc } from '../../hoc/quiz_hoc'

const ViewQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function ViewQuiz() {
	return (
		<ViewQuizWithContext
			isViewOnly={true}
			buttonText={'View'}
		/>
	)
}
