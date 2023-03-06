// routing for create organization
import * as React from 'react'
import OrganizationPage from '../../components/common/form_modals/organization_page'
import { OrganizationHoc } from '../../hoc/organization_hoc'

const AddOrganizationWithContext = OrganizationHoc(OrganizationPage)
export default function AddOrganizations() {
	return <AddOrganizationWithContext buttonText={'Add'} />
}
