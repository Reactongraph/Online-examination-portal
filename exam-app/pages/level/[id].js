import * as React from 'react'
import Layout from '../../components/layout/layout'
import LevelModulePage from '../../components/common/form_modals/level_module_page'

export default function ViewLevelPage({ levelId }) {
	return (
		<>
			<Layout title='View level'>
				<LevelModulePage
					isViewOnly={true}
					buttonText={'View'}
					modalId={levelId}
					modalName={'LEVEL'}
				/>
			</Layout>
		</>
	)
}
ViewLevelPage.getInitialProps = async ({ query: { id } }) => {
	return {
		levelId: id,
	}
}
