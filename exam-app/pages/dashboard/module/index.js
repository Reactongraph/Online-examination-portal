import * as React from 'react'

import Module from '../../../components/module/Module'
import Layout from '../../../components/layout/Layout'
import { GetModuleData } from '../../../apis/modules'
import { useSelector } from 'react-redux'

// You can't name a function as MODULE...
export default function Modules() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } = GetModuleData(user.token)
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
