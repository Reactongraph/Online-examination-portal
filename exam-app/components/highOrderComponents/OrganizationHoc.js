import Layout from '../layout/Layout'
import { OrganizationContextProvider } from '../context/organization_data_context'

export const OrganizationHoc = (Component) => {
	return function OrganizationHoc(props) {
		return (
			<>
				<OrganizationContextProvider>
					<Layout title='Organization'>
						<Component {...props} />
					</Layout>
				</OrganizationContextProvider>
			</>
		)
	}
}
