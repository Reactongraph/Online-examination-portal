import * as React from 'react'
import Layout from '../../components/layout/layout'
import LevelModulePage from '../../components/common/form_modals/level_module_page'

export default function AddLevels() {
	return (
		<>
			<Layout title='Add New level'>
				<LevelModulePage
					isEdit={false}
					buttonText={'Add'}
					modalName={'LEVEL'}
					isViewOnly={false}
					placeholderText={'eg. Easy , Moderate , etc ...'}
				/>
			</Layout>
		</>
	)
}
