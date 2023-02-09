import * as React from 'react'
import AddLevelComponent from '../../components/level/add_level'
import Layout from '../../components/layout/layout'

export default function AddLevels() {
	return (
		<>
			<Layout title='Add New level'>
				<AddLevelComponent buttonText={'Add'} />
			</Layout>
		</>
	)
}
