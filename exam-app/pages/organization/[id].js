import * as React from 'react'
import CreateOrganization from '../../components/organization/addOrganization'

import { OrganizationHoc } from '../../components/highOrderComponents/OrganizationHoc'

const ViewOrganizationWithContext = OrganizationHoc(CreateOrganization)
export default function ViewOrganizationPage() {
	return <ViewOrganizationWithContext isViewOnly={true} />
}
