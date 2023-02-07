import AddModuleComponent from '../../components/module/add_module'
import * as React from 'react'
import Layout from '../../components/layout/layout'

export default function AddModules() {
	return (
		<>
			<Layout title='Add New Module'>
				<AddModuleComponent />
			</Layout>
		</>
	)
}
