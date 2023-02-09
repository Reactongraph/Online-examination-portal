import React from 'react'
import ModuleTable from './module_table'
import { FrontPageComponent } from '../common/front_page_component'

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
