import AddQuizComponent from '../../components/quiz/addQuiz'
import { QuizHoc } from '../../components/highOrderComponents/QuizHoc'

// Use the wrapped components
const AddQuizPageWithContext = QuizHoc(AddQuizComponent)

export default function AddQuiz() {
	return <AddQuizPageWithContext />
}
