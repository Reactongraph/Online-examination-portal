import * as React from 'react'
import Module from '../../../components/module/Module'
import Layout from '../../../components/layout/Layout'
import { GetModuleData } from '../../../apis/modules'
import { ModuleContext } from '../../../components/context'

// You can't name a function as MODULE...
export default function Modules() {
	const { data, mutate } = GetModuleData()
	return (
		<>
			<ModuleContext.Provider value={{ module_data: data, mutate: mutate }}>
				<Layout title='Module'>
					<Module />
				</Layout>
			</ModuleContext.Provider>
		</>
	)
}
