import * as React from 'react'

import Module from '../../../components/module/Module'
import Layout from '../../../components/layout/Layout'
import { GetModuleData, GetModuleDataWithId } from '../../../apis/modules'
import { useSelector } from 'react-redux'

// You can't name a function as MODULE...
export default function modules() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetModuleData(user.token)
			: GetModuleDataWithId(user.token, user.id)
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
