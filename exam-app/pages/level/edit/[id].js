import * as React from 'react'
import LevelModulePage from '../../../components/common/form_modals/level_module_page'

import Layout from '../../../components/layout/layout'

export default function EditLevels({ levelId }) {
	return (
		<>
			<Layout title='Edit level'>
				<LevelModulePage
					isEdit={true}
					buttonText={'Edit'}
					modalId={levelId}
					modalName={'LEVEL'}
					isViewOnly={false}
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
