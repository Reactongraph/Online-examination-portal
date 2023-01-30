import * as React from 'react'

import Module from '../../components/module/Module'
import Layout from '../../components/layout/Layout'
import { GetModuleData } from '../../apis/modules'

// You can't name a function as MODULE...
export default function Modules() {
	const { data, mutate } = GetModuleData()
	return (
		<>
			<Layout title='Module'>
				<Module
					module_data={data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}
