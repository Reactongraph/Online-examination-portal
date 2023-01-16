import * as React from 'react'

import Level from '../../../components/level/Level'
import Layout from '../../../components/layout/Layout'
import { useSelector } from 'react-redux'
import { GetLevelData } from '../../../apis/levels'

export default function Levels() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } = GetLevelData(user.token)
	return (
		<>
			<Layout title='Level'>
				<Level
					level_data={data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}
