import * as React from 'react'
import CreateOrganization from '../../../components/organization/add_organization'
import { OrganizationHoc } from '../../../HOC/organization_hoc'

const EditOrganizationWithContext = OrganizationHoc(CreateOrganization)

export default function EditPage() {
	return <EditOrganizationWithContext />
}
