import React from 'react'
import Layout from '../../../components/layout/layout'
import UserProfileModal from '../../../components/common/user_profile_modal'

export default function EditUserProfile() {
	return (
		<>
			<Layout title='Edit Profile'>
				<UserProfileModal buttonText={'Edit'} />
			</Layout>
		</>
	)
}
