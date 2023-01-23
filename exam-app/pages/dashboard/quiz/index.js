import * as React from 'react'
import Quiz from '../../../components/quiz/Quiz'
import Layout from '../../../components/layout/Layout'
import { GetQuizData } from '../../../apis/quizzes'
import { GetLevelData } from '../../../apis/levels'
import { useSelector } from 'react-redux'
import { GetModuleData } from '../../../apis/modules'
import { QuizContext } from '../../../components/context'

// You can't name a function as MODULE...
export default function Quizes() {
	const user = useSelector((state) => state?.user)
	const data = GetQuizData(user?.token)
	const level_data = GetLevelData(user?.token)
	let module_data = GetModuleData(user?.token)

	const updatedModuleData = module_data.data?.map((item) => {
		return {
			...item,
			label: item.module,
			value: item.module,
		}
	})

	return (
		<>
			<Layout title='Quiz'>
				<QuizContext.Provider
					value={{
						quiz_data: data,
						level_data: level_data,
						module_data: updatedModuleData,
					}}>
					<Quiz />
				</QuizContext.Provider>
			</Layout>
		</>
	)
}
