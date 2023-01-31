import { GetLevelData } from '../../apis/levels'
import { GetModuleData } from '../../apis/modules'
import Layout from '../../components/layout/Layout'
import AddQuestion from '../../components/questions/addQuestion'

export default function ViewQuestions() {
	const { data: level_data } = GetLevelData()
	const { data: module_data } = GetModuleData()
	return (
		<>
			<Layout title='View Questions'>
				<AddQuestion
					level_data={level_data}
					module_data={module_data}
					isViewOnly={true}
				/>
			</Layout>
		</>
	)
}
