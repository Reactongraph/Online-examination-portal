import AddQuizComponent from '../../../components/quiz/addQuiz'
import { QuizHoc } from '../../../components/highOrderComponents/QuizHoc'

const EditQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function EditQuiz() {
	return (
		<EditQuizWithContext
			buttonText={'Edit'}
			editform={true}
		/>
	)
}
