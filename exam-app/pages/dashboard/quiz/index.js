import * as React from 'react'
import Quiz from '../../../components/quiz/Quiz'
import Layout from '../../../components/layout/Layout'
import { GetQuizData } from '../../../apis/quizzes'
import { GetLevelData } from '../../../apis/levels'
import { GetModuleData } from '../../../apis/modules'

// You can't name a function as MODULE...
export default function Quizes() {
	const data = GetQuizData()
	const level_data = GetLevelData()
	let module_data = GetModuleData()

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
				<Quiz
					quiz_data={data}
					level_data={level_data}
					module_data={updatedModuleData}
				/>
			</Layout>
		</>
	)
}
