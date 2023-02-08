import * as React from 'react'

import Layout from '../../../components/layout/Layout'
import AddLevelComponent from '../../../components/level/addLevel'

export default function EditLevels() {
	return (
		<>
			<Layout title='Edit level'>
				<AddLevelComponent
					editform={true}
					buttonText={'Edit'}
				/>
			</Layout>
		</>
	)
}
