import { GetLevelData } from '../../apis/levels'
import { GetModuleData } from '../../apis/modules'
import { GetQuizData } from '../../apis/quizzes'
import { QuizContext } from '../../components/context'
import Layout from '../../components/layout/Layout'

export const QuizHoc = (Component) => {
	return (props) => {
		const data = GetQuizData()

		const { data: level_data } = GetLevelData()
		let { data: module_data } = GetModuleData()

		const updatedModuleData = module_data?.map((item) => {
			return {
				...item,
				label: item.module,
				value: item.module,
			}
		})

		return (
			<QuizContext.Provider
				value={{ quiz_data: data, level_data, module_data: updatedModuleData }}>
				<Layout title='Quiz'>
					<Component {...props} />
				</Layout>
			</QuizContext.Provider>
		)
	}
}
