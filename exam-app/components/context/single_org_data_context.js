import { useRouter } from 'next/router'
import { GetOrganizationDataWithId } from '../../apis/organizations'

import { SingleOrgDataContext } from './context'

export const SingleOrgContextProvider = ({ children }) => {
	const router = useRouter()
	const { data: singleOrgData } = GetOrganizationDataWithId(router.query?.id)

	return (
		<SingleOrgDataContext.Provider value={{ singleOrgData }}>
			{children}
		</SingleOrgDataContext.Provider>
	)
}
