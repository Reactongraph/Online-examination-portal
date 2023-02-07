import * as React from 'react'

import OrganizationComponent from '../../components/organization/Organization'
import { OrganizationHoc } from '../../HOC/OrganizationHoc'

const OrganizationWithContext = OrganizationHoc(OrganizationComponent)
export default function Organization() {
	return <OrganizationWithContext />
}
