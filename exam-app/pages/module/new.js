import AddModuleComponent from '../../components/module/addModule'
import * as React from 'react'
import Layout from '../../components/layout/Layout'

export default function AddModules() {
	return (
		<>
			<Layout title='Add New Module'>
				<AddModuleComponent buttonText={'Add'} />
			</Layout>
		</>
	)
}
