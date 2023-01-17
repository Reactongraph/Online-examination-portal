import * as React from 'react'
import AddQuestion from '../../../components/questions/addQuestion'
import Layout from '../../../components/layout/Layout'
import { GetModuleData } from '../../../apis/modules'
import { useSelector } from 'react-redux'
import { GetLevelData } from '../../../apis/levels'

// You can't name a function as MODULE...
export default function AddQuestions() {
	const user = useSelector((state) => state?.user)
	const { data: level_data } = GetLevelData(user?.token)
	const { data: module_data } = GetModuleData(user?.token)
	return (
		<>
			<Layout title='Questions'>
				<AddQuestion
					level_data={level_data}
					module_data={module_data}
				/>
			</Layout>
		</>
	)
}
