import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import { useSelector } from 'react-redux'
import { OrganizationContext } from '../../../components/context'

import {
	GetOrganizationData,
	GetOrganizationDataWithId,
} from '../../../apis/organizations'
import OrganizationComponent from '../../../components/organization/Organization'

export default function Organization() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetOrganizationData(user.token)
			: GetOrganizationDataWithId(user.token, user.Org_id)

	return (
		<>
			<OrganizationContext.Provider
				value={{ organization_data: data, mutate: mutate }}>
				<Layout title='Organization'>
					<OrganizationComponent />
				</Layout>
			</OrganizationContext.Provider>
		</>
	)
}
