import AddQuizComponent from '../../../components/quiz/addQuiz'
import { QuizHoc } from '../quizHoc'

const EditQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function EditQuiz() {
	return <EditQuizWithContext />
}
