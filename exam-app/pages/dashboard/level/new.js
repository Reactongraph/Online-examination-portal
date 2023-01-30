import * as React from 'react'
import AddLevelComponent from '../../../components/level/addLevel'
import Layout from '../../../components/layout/Layout'

export default function AddLevels() {
	return (
		<>
			<Layout title='Add New level'>
				<AddLevelComponent />
			</Layout>
		</>
	)
}
