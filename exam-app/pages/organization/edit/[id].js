import * as React from 'react'
import OrganizationPage from '../../../components/common/form_modals/organization_page'
import { OrganizationHoc } from '../../../hoc/organization_hoc'

const EditOrganizationWithContext = OrganizationHoc(OrganizationPage)

export default function EditOrganizationPage({ organizationId }) {
	return (
		<EditOrganizationWithContext
			buttonText={'Edit'}
			isEdit={true}
			organizationId={organizationId}
		/>
	)
}
EditOrganizationPage.getInitialProps = async ({ query: { id } }) => {
	return {
		organizationId: id,
	}
}
