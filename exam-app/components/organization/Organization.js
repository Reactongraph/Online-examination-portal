import React from 'react'
import OrganizationTable from './OrganizationTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Organization = () => {
	return (
		<FrontPageComponent
			title='ORGANIZATION'
			titleDescription='List of all organization'
			buttonTitle='ADD ORAGANIZATION'
			editForm={false}
			TableComponent={OrganizationTable}
		/>
	)
}

export default Organization
