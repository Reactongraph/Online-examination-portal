import * as React from 'react'
import Layout from '../../components/layout/Layout'

import { GetOrganizationData } from '../../apis/organizations'
import OrganizationComponent from '../../components/organization/Organization'

export default function Organization() {
	const { data, mutate } = GetOrganizationData()

	return (
		<>
			<Layout title='Organization'>
				<OrganizationComponent
					organization_data={data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}
