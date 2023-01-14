import * as React from 'react'
import Quiz from '../../../components/quiz/Quiz'
import Layout from '../../../components/layout/Layout'
import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'
import { GetQuizData } from '../../../apis/quizzes'
import { GetLevelData } from '../../../apis/levels'
import { useSelector } from 'react-redux'
import { GetModuleData } from '../../../apis/modules'

// You can't name a function as MODULE...
export default function Quizes() {
	const user = useSelector((state) => state?.user)
	const  data =
		GetQuizData(user?.token)
	const level_data= GetLevelData(user?.token)
	const module_data=GetModuleData(user?.token)

	return (
		<>
			<Layout title='Quiz'>
				<Quiz
					quiz_data={data}
					level_data={level_data}
					module_data={module_data}
				/>
			</Layout>
		</>
	)
}
