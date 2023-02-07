import * as React from 'react'

import OrganizationComponent from '../../components/organization/organization'
import { OrganizationHoc } from '../../HOC/organization_hoc'

const OrganizationWithContext = OrganizationHoc(OrganizationComponent)
export default function Organization() {
	return <OrganizationWithContext />
}
