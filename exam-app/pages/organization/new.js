// routing for create organization
import * as React from 'react'
import CreateOrganization from '../../components/organization/add_organization'
import { OrganizationHoc } from '../../hoc/organization_hoc'

const AddOrganizationWithContext = OrganizationHoc(CreateOrganization)
export default function AddOrganizations() {
	return <AddOrganizationWithContext buttonText={'Add'} />
}
