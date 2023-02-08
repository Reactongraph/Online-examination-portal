import React from 'react'
import Layout from '../../../components/layout/Layout'
import UserProfileModal from '../../../components/common/UserProfileModal'

export default function EditUserProfile() {
	return (
		<>
			<Layout title='Edit Profile'>
				<UserProfileModal buttonText={'Edit'} />
			</Layout>
		</>
	)
}
