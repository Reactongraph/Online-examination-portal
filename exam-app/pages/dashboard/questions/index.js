import Question from '../../../components/questions/Question'
import Layout from '../../../components/layout/Layout'
import { GetQuestionData } from '../../../apis/questions'
import { QuestionContext } from '../../../components/context'

// You can't name a function as MODULE...
export default function Questions() {
	const { data, mutate } = GetQuestionData()

	return (
		<>
			<QuestionContext.Provider value={{ question_data: data, mutate: mutate }}>
				<Layout title='Questions'>
					<Question />
				</Layout>
			</QuestionContext.Provider>
		</>
	)
}
