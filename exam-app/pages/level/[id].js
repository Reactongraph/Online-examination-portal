import * as React from 'react'
import AddLevelComponent from '../../components/level/add_level'
import Layout from '../../components/layout/layout'

export default function ViewLevelPage({ LevelId }) {
	return (
		<>
			<Layout title='View level'>
				<AddLevelComponent
					isViewOnly={true}
					buttonText={'View'}
					LevelId={LevelId}
				/>
			</Layout>
		</>
	)
}
ViewLevelPage.getInitialProps = async ({ query: { id } }) => {
	return {
		LevelId: id,
	}
}
