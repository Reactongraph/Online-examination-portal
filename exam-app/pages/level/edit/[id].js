import * as React from 'react'
import LevelModulePage from '../../../components/common/form_modals/level_module_page'

import Layout from '../../../components/layout/layout'
import { EditLevel } from '../../../apis/levels'

export default function EditLevels({ levelId }) {
	return (
		<>
			<Layout title='Edit level'>
				<LevelModulePage
					buttonText={'Edit'}
					modalId={levelId}
					modalName={'LEVEL'}
					isViewOnly={false}
					apiMethod={EditLevel}
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
