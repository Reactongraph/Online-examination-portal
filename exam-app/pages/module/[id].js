import AddModuleComponent from '../../components/module/add_module'
import * as React from 'react'
import Layout from '../../components/layout/layout'

export default function ViewModulePage() {
	return (
		<>
			<Layout title='View Module'>
				<AddModuleComponent isViewOnly={true} />
			</Layout>
		</>
	)
}
