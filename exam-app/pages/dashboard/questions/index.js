import Question from '../../../components/questions/Question'
import Layout from '../../../components/layout/Layout'
import { useSelector } from 'react-redux'
import { GetQuestionData } from '../../../apis/questions'
import { QuestionContext } from '../../../components/context'

// You can't name a function as MODULE...
export default function Questions() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } = GetQuestionData(user?.token)

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
