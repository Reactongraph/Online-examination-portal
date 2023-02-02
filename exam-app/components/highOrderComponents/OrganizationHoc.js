import Layout from '../layout/Layout'
import { OrganizationProvider } from '../context/organization_data_context'
import { SingleOrgContextProvider } from '../context/single_org_data_context'

export const OrganizationHoc = (Component) => {
	return function OrganizationHoc(props) {
		return (
			<>
				<OrganizationProvider>
					<SingleOrgContextProvider>
						<Layout title='Organization'>
							<Component {...props} />
						</Layout>
					</SingleOrgContextProvider>
				</OrganizationProvider>
			</>
		)
	}
}
