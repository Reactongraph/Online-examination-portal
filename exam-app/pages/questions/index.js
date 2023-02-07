import Question from '../../components/questions/question'

import { QuestionHoc } from '../../HOC/question_hoc'

const QuestionWithContext = QuestionHoc(Question)

export default function Questions() {
	return <QuestionWithContext />
}
