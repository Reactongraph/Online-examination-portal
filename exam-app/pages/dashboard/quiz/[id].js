import { GetLevelData } from '../../../apis/levels'
import { GetModuleData } from '../../../apis/modules'
import Layout from '../../../components/layout/Layout'
import AddQuizComponent from '../../../components/quiz/addQuiz'

export default function ViewQuiz() {
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
		<>
			<Layout title='View Quiz'>
				<AddQuizComponent
					level_data={level_data}
					module_data={updatedModuleData}
					isViewOnly={true}
				/>
			</Layout>
		</>
	)
}
