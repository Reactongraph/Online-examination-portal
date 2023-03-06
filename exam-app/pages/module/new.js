import * as React from 'react'
import Layout from '../../components/layout/layout'
import { AddModule } from '../../apis/modules'
import LevelModulePage from '../../components/common/form_modals/level_module_page'

export default function AddModules() {
	return (
		<>
			<Layout title='Add New Module'>
				<LevelModulePage
					buttonText={'Add'}
					modalName={'MODULE'}
					isViewOnly={false}
					placeholderText={'eg. Easy , Moderate , etc ...'}
					apiMethod={AddModule}
				/>
			</Layout>
		</>
	)
}
