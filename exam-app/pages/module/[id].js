import AddModuleComponent from '../../components/module/add_module'
import * as React from 'react'
import Layout from '../../components/layout/layout'

export default function ViewModulePage({ moduleId }) {
	return (
		<>
			<Layout title='View Module'>
				<AddModuleComponent
					isViewOnly={true}
					buttonText={'View'}
					moduleId={moduleId}
				/>
			</Layout>
		</>
	)
}
ViewModulePage.getInitialProps = async ({ query: { id } }) => {
	return {
		moduleId: id,
	}
}
