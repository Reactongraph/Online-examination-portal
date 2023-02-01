import {
	GetOrganizationData,
	GetOrganizationDataWithId,
} from '../../apis/organizations'

import { OrganizationContext } from '../context'
import Layout from '../layout/Layout'
import { useRouter } from 'next/router'

export const OrganizationHoc = (Component) => {
	return function OrganizationHoc(props) {
		const router = useRouter()
		const { data: organization_data, mutate } = GetOrganizationData()
		const { data: singleOrgData } = GetOrganizationDataWithId(router.query?.id)

		return (
			<>
				<OrganizationContext.Provider
					value={{ organization_data, mutate, singleOrgData }}>
					<Layout title='Organization'>
						<Component {...props} />
					</Layout>
				</OrganizationContext.Provider>
			</>
		)
	}
}
