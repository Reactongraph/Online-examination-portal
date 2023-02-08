import * as React from 'react'
import AddLevelComponent from '../../components/level/addLevel'
import Layout from '../../components/layout/Layout'

export default function ViewLevelPage() {
	return (
		<>
			<Layout title='View level'>
				<AddLevelComponent
					isViewOnly={true}
					buttonText={'View'}
				/>
			</Layout>
		</>
	)
}
