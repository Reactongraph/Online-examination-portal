import Question from '../../components/questions/question'

import { QuestionHoc } from '../../hoc/question_hoc'

const QuestionWithContext = QuestionHoc(Question)

export default function Questions() {
	return <QuestionWithContext />
}
