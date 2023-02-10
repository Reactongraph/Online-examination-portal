import * as React from 'react'
import CreateOrganization from '../../components/organization/add_organization'

import { OrganizationHoc } from '../../hoc/organization_hoc'

const ViewOrganizationWithContext = OrganizationHoc(CreateOrganization)
export default function ViewOrganizationPage({ organizationId }) {
	return (
		<ViewOrganizationWithContext
			isViewOnly={true}
			buttonText={'View'}
			organizationId={organizationId}
		/>
	)
}

ViewOrganizationPage.getInitialProps = async ({ query: { id } }) => {
	return {
		organizationId: id,
	}
}
