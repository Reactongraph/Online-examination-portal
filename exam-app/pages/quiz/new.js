import AddQuizComponent from '../../components/quiz/addQuiz'
import { QuizHoc } from './quizHoc'

// Use the wrapped components
const AddQuizPageWithContext = QuizHoc(AddQuizComponent)

export default function AddQuiz() {
	return <AddQuizPageWithContext />
}
