import * as React from 'react'

import Layout from '../../../components/layout/layout'
import AddLevelComponent from '../../../components/level/add_level'

export default function EditLevels({ userId}) {
	return (
		<>
			<Layout title='Edit level'>
				<AddLevelComponent
					editform={true}
					buttonText={'Edit'}
					userId={userId}
				/>
			</Layout>
		</>
	)
}
EditLevels.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}