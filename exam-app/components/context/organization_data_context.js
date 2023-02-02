import { useRouter } from 'next/router'
import {
	GetOrganizationData,
	GetOrganizationDataWithId,
} from '../../apis/organizations'

import { OrganizationContext } from './context'

export const OrganizationContextProvider = ({ children }) => {
	const router = useRouter()
	const { data: organization_data, mutate } = GetOrganizationData()

	return (
		<OrganizationContext.Provider value={{ organization_data, mutate }}>
			{children}
		</OrganizationContext.Provider>
	)
}
