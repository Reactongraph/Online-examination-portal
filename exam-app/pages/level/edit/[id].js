import * as React from 'react'

import Layout from '../../../components/layout/layout'
import AddLevelComponent from '../../../components/level/add_level'

export default function EditLevels({ LevelId }) {
	return (
		<>
			<Layout title='Edit level'>
				<AddLevelComponent
					editform={true}
					buttonText={'Edit'}
					LevelId={LevelId}
				/>
			</Layout>
		</>
	)
}
EditLevels.getInitialProps = async ({ query: { id } }) => {
	return {
		LevelId: id,
	}
}
