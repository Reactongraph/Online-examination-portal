import * as React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'
import Layout from '../../components/layout/Layout'
import UserProfileComponent from '../../components/userProfile/UserProfile'
import { GetAdminDataWithId } from '../../apis/admin'
import { useSelector } from 'react-redux'
import { GetOrganizationDataWithId } from '../../apis/organizations'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

export default function UserProfile() {
	const user = useSelector((state) => state?.user)
	const { data: profile_data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetAdminDataWithId(user?.Org_id)
			: GetOrganizationDataWithId(user?.Org_id)

	return (
		<>
			<Layout title='User Profile '>
				<UserProfileComponent
					profile_data={profile_data}
					mutate={mutate}
				/>
			</Layout>
			<ToastContainer />
		</>
	)
}
