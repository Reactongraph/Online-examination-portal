// routing for create organization
import * as React from 'react'
import Layout from '../../components/layout/Layout'
import CreateOrganization from '../../components/organization/addOrganization'

export default function AddOrganizations() {
	return (
		<>
			<Layout title='Add Organizations'>
				<CreateOrganization  />
			</Layout>
		</>
	)
}
