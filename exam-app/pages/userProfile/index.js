import * as React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'
import Layout from '../../components/layout/layout'
import UserProfileComponent from '../../components/userProfile/user_profile'
import { GetAdminDataWithId } from '../../apis/admin'
import { GetUserProfileData } from '../../apis/organizations'
import { useSession } from 'next-auth/react'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

export default function UserProfile() {
	const { data: session } = useSession()
	const user = session?.user

	const { data: profile_data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetAdminDataWithId(user?.organization_id)
			: GetUserProfileData(user?.organization_id)

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
