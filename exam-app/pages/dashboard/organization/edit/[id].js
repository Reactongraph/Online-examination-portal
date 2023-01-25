import * as React from 'react'
import Layout from '../../../../components/layout/Layout'
import CreateOrganization from '../../../../components/organization/addOrganization'

export default function EditPage() {
	return (
		<>
			<Layout title='Organization '>
				<CreateOrganization />
			</Layout>
		</>
	)
}
