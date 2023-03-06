import * as React from 'react'

import Level from '../../components/level/level'
import Layout from '../../components/layout/layout'
import { GetLevelData } from '../../apis/levels'

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
