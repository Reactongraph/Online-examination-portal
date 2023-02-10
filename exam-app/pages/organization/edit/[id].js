import * as React from 'react'
import CreateOrganization from '../../../components/organization/add_organization'
import { OrganizationHoc } from '../../../hoc/organization_hoc'

const EditOrganizationWithContext = OrganizationHoc(CreateOrganization)

export default function EditOrganizationPage({ organizationId }) {
	return (
		<EditOrganizationWithContext
			buttonText={'Edit'}
			editform={true}
			organizationId={organizationId}
		/>
	)
}
EditOrganizationPage.getInitialProps = async ({ query: { id } }) => {
	return {
		organizationId: id,
	}
}
