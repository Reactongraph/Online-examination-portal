import * as React from 'react'
import CreateOrganization from '../../components/organization/add_organization'

import { OrganizationHoc } from '../../HOC/organization_hoc'

const ViewOrganizationWithContext = OrganizationHoc(CreateOrganization)
export default function ViewOrganizationPage() {
	return <ViewOrganizationWithContext isViewOnly={true} />
}
