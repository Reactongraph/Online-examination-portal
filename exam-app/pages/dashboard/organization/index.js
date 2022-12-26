import * as React from 'react'
import Organization from '../../../components/organization/Organization'
import Layout from '../../../components/layout/Layout'

import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'

export default function organization({ org_data }) {
	return (
		<>
			<Layout title='Organization'>
				<Organization org_data={org_data} />
			</Layout>
		</>
	)
}

// function for ssr data

export async function getServerSideProps(data) {
	try {
		let org_data
		const res = await axios.get(`${SERVER_LINK}/organization/find`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: data.req.cookies.access_token,
			},
		})
		org_data = res.data
		return { props: { org_data } }
	} catch (error) {
		let error_data = {
			message: 'your are not auth',
		}
		return { props: { error_data } }
	}
}
