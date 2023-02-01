import * as React from 'react'
import CreateOrganization from '../../../components/organization/addOrganization'
import { OrganizationHoc } from '../../../components/highOrderComponents/OrganizationHoc'

const EditOrganizationWithContext = OrganizationHoc(CreateOrganization)

export default function EditPage() {
	return <EditOrganizationWithContext />
}
