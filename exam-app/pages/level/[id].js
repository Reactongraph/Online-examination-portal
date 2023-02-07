import * as React from 'react'
import AddLevelComponent from '../../components/level/add_level'
import Layout from '../../components/layout/layout'

export default function ViewLevelPage() {
	return (
		<>
			<Layout title='View level'>
				<AddLevelComponent isViewOnly={true} />
			</Layout>
		</>
	)
}
