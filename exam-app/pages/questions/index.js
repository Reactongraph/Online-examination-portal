import Question from '../../components/questions/Question'

import { QuestionHoc } from '../../components/highOrderComponents/QuestionHoc'

const QuestionWithContext = QuestionHoc(Question)

export default function Questions() {
	return <QuestionWithContext />
}
