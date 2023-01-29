import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import CreateOrganization from '../../../components/organization/addOrganization'
export default function ViewOrganizationPage() {
	return (
		<>
			<Layout>
				<CreateOrganization isViewOnly={true} />
			</Layout>
		</>
	)
}
