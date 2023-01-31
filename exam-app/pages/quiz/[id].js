import AddQuizComponent from '../../components/quiz/addQuiz'
import { QuizHoc } from './quizHoc'

const ViewQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function ViewQuiz() {
	return <ViewQuizWithContext isViewOnly={true} />
}
