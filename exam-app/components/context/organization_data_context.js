import { useRouter } from 'next/router'
import {
	GetOrganizationData,
	GetOrganizationDataWithId,
} from '../../apis/organizations'

import { OrganizationContext } from './context'

export const OrganizationContextProvider = ({ children }) => {
	const router = useRouter()
	const { data: organization_data, mutate } = GetOrganizationData()
	const { data: singleOrgData } = GetOrganizationDataWithId(router.query?.id)

	return (
		<OrganizationContext.Provider
			value={{ organization_data, mutate, singleOrgData }}>
			{children}
		</OrganizationContext.Provider>
	)
}
