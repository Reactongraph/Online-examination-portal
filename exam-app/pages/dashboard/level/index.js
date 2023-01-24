import * as React from 'react'

import Level from '../../../components/level/Level'
import Layout from '../../../components/layout/Layout'
import { GetLevelData } from '../../../apis/levels'
import { LevelContext } from '../../../components/context'

export default function Levels() {
	const { data, mutate } = GetLevelData()
	return (
		<>
			<LevelContext.Provider value={{ level_data: data, mutate: mutate }}>
				<Layout title='Level'>
					{' '}
					<Level />
				</Layout>
			</LevelContext.Provider>
		</>
	)
}
