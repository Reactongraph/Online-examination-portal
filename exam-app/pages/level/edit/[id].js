import * as React from 'react'

import Layout from '../../../components/layout/layout'
import AddLevelComponent from '../../../components/level/add_level'

export default function EditLevels({ levelId }) {
	return (
		<>
			<Layout title='Edit level'>
				<AddLevelComponent
					editform={true}
					buttonText={'Edit'}
					levelId={levelId}
				/>
			</Layout>
		</>
	)
}
EditLevels.getInitialProps = async ({ query: { id } }) => {
	return {
		levelId: id,
	}
}
