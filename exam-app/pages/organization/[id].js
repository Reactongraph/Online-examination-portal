import * as React from 'react'
import CreateOrganization from '../../components/organization/add_organization'

import { OrganizationHoc } from '../../hoc/organization_hoc'

const ViewOrganizationWithContext = OrganizationHoc(CreateOrganization)
export default function ViewOrganizationPage({ userId }) {
	return (
		<ViewOrganizationWithContext
			isViewOnly={true}
			buttonText={'View'}
			userId={userId}
		/>
	)
}

ViewOrganizationPage.getInitialProps = async ({ query: { id } }) => {
	return {
		userId: id,
	}
}
