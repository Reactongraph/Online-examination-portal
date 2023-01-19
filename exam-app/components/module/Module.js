import React from 'react'
import ModuleTable from './ModuleTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Modules = ({ module_data, mutate }) => {
	return (
		<FrontPageComponent
			title='MODULE'
			titleDescription='List of all modules'
			buttonTitle='ADD NEW MODULE'
			editForm={false}
			mutate={mutate}
			data={module_data}
			TableComponent={ModuleTable}
		/>
	)
}

export default Modules
