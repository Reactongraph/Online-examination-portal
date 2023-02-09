import * as React from 'react'
import AddLevelComponent from '../../components/level/add_level'
import Layout from '../../components/layout/layout'

export default function ViewLevelPage({ userId }) {
	return (
		<>
			<Layout title='View level'>
				<AddLevelComponent
					isViewOnly={true}
					buttonText={'View'}
					userId={userId}
				/>
			</Layout>
		</>
	)
}
ViewLevelPage.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
