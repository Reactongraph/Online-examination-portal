import React from 'react'
import OrganizationTable from './organization_table'
import { FrontPageComponent } from '../common/front_page_component'

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
