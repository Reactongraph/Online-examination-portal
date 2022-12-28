import * as React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'

import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import jwt_decode from 'jwt-decode'
import UserProfileComponent from '../../components/userProfile/UserProfile'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

export default function UserProfile({ profile_data }) {
	return (
		<>
			<Layout title='Dashboard '>
				<UserProfileComponent profile_data={profile_data} />
			</Layout>
			<ToastContainer />
		</>
	)
}
export async function getServerSideProps(data) {
	// Fetch data from external API
	let accessToken = data.req.cookies.access_token
	let decodedData = jwt_decode(accessToken)

	const organization = await axios.get(
		`${SERVER_LINK}/organization/${decodedData.id}`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: accessToken,
			},
		}
	)

	let profile_data = organization.data

	// Pass data to the page via props
	return { props: { profile_data } }
}
