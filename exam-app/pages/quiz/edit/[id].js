import AddQuizComponent from '../../../components/quiz/add_quiz'
import { QuizHoc } from '../../../hoc/quiz_hoc'

const EditQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function EditQuiz() {
	return <EditQuizWithContext />
}
