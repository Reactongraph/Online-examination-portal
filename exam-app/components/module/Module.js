import React from 'react'
import ModuleTable from './ModuleTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Modules = () => {
	return (
		<FrontPageComponent
			title='MODULE'
			titleDescription='List of all modules'
			buttonTitle='ADD NEW MODULE'
			editForm={false}
			TableComponent={ModuleTable}
		/>
	)
}

export default Modules
