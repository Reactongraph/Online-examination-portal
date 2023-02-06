import * as React from 'react'

import OrganizationComponent from '../../components/organization/Organization'
import { OrganizationHoc } from '../../components/highOrderComponents/OrganizationHoc'

const OrganizationWithContext = OrganizationHoc(OrganizationComponent)
export default function Organization() {
	return <OrganizationWithContext />
}
