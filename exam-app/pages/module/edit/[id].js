import * as React from 'react'
import { EditModule } from '../../../apis/modules'
import LevelModulePage from '../../../components/common/form_modals/level_module_page'

import Layout from '../../../components/layout/layout'

export default function EditModules({ moduleId }) {
	return (
		<>
			<Layout title='Edit Module'>
				<LevelModulePage
					buttonText={'Edit'}
					modalId={moduleId}
					modalName={'MODULE'}
					isViewOnly={false}
					apiMethod={EditModule}
				/>
			</Layout>
		</>
	)
}
EditModules.getInitialProps = async ({ query: { id } }) => {
	return {
		moduleId: id,
	}
}
