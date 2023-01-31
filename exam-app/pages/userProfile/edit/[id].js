import React from 'react'
import Layout from '../../../components/layout/Layout'
import UserProfileModal from '../../../components/common/UserProfileModal'
import { useRouter } from 'next/router'
import { GetOrganizationDataWithId } from '../../../apis/organizations'

export default function EditUserProfile() {
	const router = useRouter()
	const userId = router.query?.id
	const { data: profile_data, mutate } = GetOrganizationDataWithId(userId)
	return (
		<>
			<Layout title='Edit Profile'>
				<UserProfileModal
					profile_data={profile_data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}
