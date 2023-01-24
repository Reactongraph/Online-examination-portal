import * as React from 'react'

import Level from '../../../components/level/Level'
import Layout from '../../../components/layout/Layout'
import { GetLevelData } from '../../../apis/levels'

export default function Levels() {
	const { data, mutate } = GetLevelData()
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
