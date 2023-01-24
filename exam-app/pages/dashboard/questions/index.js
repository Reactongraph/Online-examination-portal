import Question from '../../../components/questions/Question'
import Layout from '../../../components/layout/Layout'
import { GetQuestionData } from '../../../apis/questions'

// You can't name a function as MODULE...
export default function Questions() {
	const { data, mutate } = GetQuestionData()

	return (
		<>
			<Layout title='Questions'>
				<Question
					question_data={data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}
