import AddQuizComponent from '../../components/quiz/add_quiz'
import { QuizHoc } from '../../HOC/quiz_hoc'

// Use the wrapped components
const AddQuizPageWithContext = QuizHoc(AddQuizComponent)

export default function AddQuiz() {
	return <AddQuizPageWithContext />
}
