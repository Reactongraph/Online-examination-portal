import * as React from 'react'

import Layout from '../../../../components/layout/Layout'
import AddLevelComponent from '../../../../components/level/addLevel'

export default function EditLevels() {
	return (
		<>
			<Layout title='Add New level'>
				<AddLevelComponent />
			</Layout>
		</>
	)
}
