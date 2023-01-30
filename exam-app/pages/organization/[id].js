import * as React from 'react'
import Layout from '../../components/layout/Layout'
import CreateOrganization from '../../components/organization/addOrganization'
export default function ViewOrganizationPage() {
	return (
		<>
			<Layout title='View Organization'>
				<CreateOrganization isViewOnly={true} />
			</Layout>
		</>
	)
}
