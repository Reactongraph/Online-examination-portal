import Question from '../../../components/questions/Question'
import Layout from '../../../components/layout/Layout'

import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'
import { useSelector } from 'react-redux'
import { GetQuestionData, GetQuestionDataWithId } from '../../../apis/questions'

// You can't name a function as MODULE...
export default function Questions() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		GetQuestionData(user.token)
	return (
		<>
			<Layout title='Questions'>
				<Question question_data={data} />
			</Layout>
		</>
	)
}