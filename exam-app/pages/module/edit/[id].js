import * as React from 'react'

import Layout from '../../../components/layout/layout'
import AddModuleComponent from '../../../components/module/add_module'

export default function EditModules({ userId }) {
	return (
		<>
			<Layout title='Edit Module'>
				<AddModuleComponent
					editform={true}
					buttonText={'Edit'}
					userId={userId}
				/>
			</Layout>
		</>
	)
}
EditModules.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
