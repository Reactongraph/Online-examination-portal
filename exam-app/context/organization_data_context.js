import { GetOrganizationData } from '../apis/organizations'

import { OrganizationContext } from './context'

export const OrganizationProvider = ({ children }) => {
	const { data: organization_data, mutate } = GetOrganizationData()

	return (
		<OrganizationContext.Provider value={{ organization_data, mutate }}>
			{children}
		</OrganizationContext.Provider>
	)
}
