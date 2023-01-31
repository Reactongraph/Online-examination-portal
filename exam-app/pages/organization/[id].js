import * as React from 'react'
import Layout from '../../components/layout/Layout'
import CreateOrganization from '../../components/organization/addOrganization'
import { useRouter } from 'next/router'
import { GetOrganizationDataWithId } from '../../apis/organizations'
export default function ViewOrganizationPage() {
	const router = useRouter()
	const { data } = GetOrganizationDataWithId(router?.query?.id)
	return (
		<>
			<Layout title='View Organization'>
				<CreateOrganization
					isViewOnly={true}
					organization_data={data}
				/>
			</Layout>
		</>
	)
}
