import Layout from '../components/layout/Layout'
import { OrganizationProvider } from '../context/organization_data_context'

export const OrganizationHoc = (Component) => {
	return function OrganizationHoc(props) {
		return (
			<>
				<OrganizationProvider>
					<Layout title='Organization'>
						<Component {...props} />
					</Layout>
				</OrganizationProvider>
			</>
		)
	}
}
