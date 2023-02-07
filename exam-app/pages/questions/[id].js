import { QuestionHoc } from '../../HOC/question_hoc'
import AddQuestion from '../../components/questions/add_question'

const ViewQuestionWithContext = QuestionHoc(AddQuestion)

export default function ViewQuestions() {
	return <ViewQuestionWithContext isViewOnly={true} />
}
