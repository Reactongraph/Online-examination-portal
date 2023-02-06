import AddQuizComponent from '../../components/quiz/addQuiz'
import { QuizHoc } from '../../components/highOrderComponents/QuizHoc'

const ViewQuizWithContext = QuizHoc(AddQuizComponent)

// Use the wrapped components
export default function ViewQuiz() {
	return <ViewQuizWithContext isViewOnly={true} />
}
