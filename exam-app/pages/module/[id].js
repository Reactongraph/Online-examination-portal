import * as React from 'react'
import Layout from '../../components/layout/layout'
import LevelModulePage from '../../components/common/form_modals/level_module_page'

export default function ViewModulePage({ moduleId }) {
	return (
		<>
			<Layout title='View Module'>
				<LevelModulePage
					isViewOnly={true}
					buttonText={'View'}
					modalId={moduleId}
					modalName={'MODULE'}
				/>
			</Layout>
		</>
	)
}
ViewModulePage.getInitialProps = async ({ query: { id } }) => {
	return {
		moduleId: id,
	}
}
