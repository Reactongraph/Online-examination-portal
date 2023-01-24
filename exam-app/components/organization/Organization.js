import React from 'react'
import OrganizationTable from './OrganizationTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Organization = ({ organization_data, mutate }) => {
	return (
		<FrontPageComponent
			title='ORGANIZATION'
			titleDescription='List of all organization'
			buttonTitle='ADD ORAGANIZATION'
			editForm={false}
			mutate={mutate}
			data={organization_data}
			TableComponent={OrganizationTable}
		/>
	)
}

export default Organization
