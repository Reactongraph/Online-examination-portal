import * as React from 'react'

import Layout from '../../../../components/layout/Layout'
import AddModuleComponent from '../../../../components/module/addModule'

export default function EditModules() {
	return (
		<>
			<Layout title='Edit Module'>
				<AddModuleComponent isViewOnly={false} />
			</Layout>
		</>
	)
}
