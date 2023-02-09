import AddModuleComponent from '../../components/module/add_module'
import * as React from 'react'
import Layout from '../../components/layout/layout'

export default function ViewModulePage({ userId }) {
	return (
		<>
			<Layout title='View Module'>
				<AddModuleComponent
					isViewOnly={true}
					buttonText={'View'}
					userId={userId}
				/>
			</Layout>
		</>
	)
}
ViewModulePage.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
