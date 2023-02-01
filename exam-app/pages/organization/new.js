// routing for create organization
import * as React from 'react'
import CreateOrganization from '../../components/organization/addOrganization'
import { OrganizationHoc } from '../../components/highOrderComponents/OrganizationHoc'

const AddOrganizationWithContext = OrganizationHoc(CreateOrganization)
export default function AddOrganizations() {
	return <AddOrganizationWithContext />
}
