import { QuestionHoc } from '../../components/highOrderComponents/QuestionHoc'
import AddQuestion from '../../components/questions/addQuestion'

const ViewQuestionWithContext = QuestionHoc(AddQuestion)

export default function ViewQuestions() {
	return <ViewQuestionWithContext isViewOnly={true} />
}
