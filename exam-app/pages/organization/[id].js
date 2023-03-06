import * as React from 'react'
import OrganizationPage from '../../components/common/form_modals/organization_page'
import { OrganizationHoc } from '../../hoc/organization_hoc'

const ViewOrganizationWithContext = OrganizationHoc(OrganizationPage)
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
