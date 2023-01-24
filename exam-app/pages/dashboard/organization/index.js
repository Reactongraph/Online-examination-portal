import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import { useSelector } from 'react-redux'

import {
	GetOrganizationData,
	GetOrganizationDataWithId,
} from '../../../apis/organizations'
import OrganizationComponent from '../../../components/organization/Organization'

export default function Organization() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetOrganizationData()
			: GetOrganizationDataWithId(user.Org_id)

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
