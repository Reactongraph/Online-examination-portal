import { GetLevelData } from '../../apis/levels'
import { GetModuleData } from '../../apis/modules'
import { GetQuestionData } from '../../apis/questions'
import { QuestionContext } from '../context'
import Layout from '../layout/Layout'

export const QuestionHoc = (Component) => {
	return (props) => {
		const { data, mutate } = GetQuestionData()
		const { data: level_data } = GetLevelData()
		const { data: module_data } = GetModuleData()

		return (
			<>
				<QuestionContext.Provider
					value={{ question_data: data, level_data, module_data, mutate }}>
					<Layout title='Questions'>
						<Component {...props} />
					</Layout>
				</QuestionContext.Provider>
			</>
		)
	}
}
