import React from 'react'
import LevelTable from './LevelTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Level = () => {
	return (
		<FrontPageComponent
			title='LEVEL'
			titleDescription='List of all levels'
			buttonTitle='ADD NEW LEVEL'
			editForm={false}
			TableComponent={LevelTable}
		/>
	)
}

export default Level
