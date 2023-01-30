import AddModuleComponent from '../../components/module/addModule'
import * as React from 'react'
import Layout from '../../components/layout/Layout'

export default function ViewModulePage() {
	return (
		<>
			<Layout title='View Module'>
				<AddModuleComponent isViewOnly={true} />
			</Layout>
		</>
	)
}
