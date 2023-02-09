import React from 'react'
import LevelTable from './level_table'
import { FrontPageComponent } from '../common/front_page_component'

const Level = ({ level_data, mutate }) => {
	return (
		<FrontPageComponent
			title='LEVEL'
			titleDescription='List of all levels'
			buttonTitle='ADD NEW LEVEL'
			editForm={false}
			mutate={mutate}
			data={level_data}
			TableComponent={LevelTable}
		/>
	)
}

export default Level
