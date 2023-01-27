import * as React from 'react'
import AddQuestion from '../../../components/questions/addQuestion'
import Layout from '../../../components/layout/Layout'
import { GetModuleData } from '../../../apis/modules'
import { GetLevelData } from '../../../apis/levels'

// You can't name a function as MODULE...
export default function AddQuestions() {
	const { data: level_data } = GetLevelData()
	const { data: module_data } = GetModuleData()
	return (
		<>
			<Layout title='Add new Questions'>
				<AddQuestion
					level_data={level_data}
					module_data={module_data}
				/>
			</Layout>
		</>
	)
}
