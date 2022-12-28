import * as React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'

import Dashboard from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import jwt_decode from "jwt-decode";


// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

export default function dashboard({profile_data}) {
	return (
		<>
			<Layout title='Dashboard '>
				{/* <Dashboard  profile_data={}/> */}
                <h1>this is the user profile page</h1>
			</Layout>
			<ToastContainer />
		</>
	)
}
export async function getServerSideProps(data) {
	// Fetch data from external API
	// const res = await axios.get(`${SERVER_LINK}/participants/find`, {
	// 	headers: {
	// 		Accept: 'application/json',
	// 		'Content-Type': 'application/json;charset=UTF-8',
	// 		Authorization: data.req.cookies.access_token,
	// 	},
	// })
    let decoded= jwt_decode(data.req.cookies.access_token)
    console.log("dataaaaaa",decoded.id);
    console.log(data.req.cookies.access_token);
	const organization = await axios.get(`${SERVER_LINK}/organization/${decoded.id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: data.req.cookies.access_token,
		},
	})
    console.log("data",organization.data);
	let profile_data = organization.data
	// let participant_data = res.data

	// Pass data to the page via props
	return { props: {profile_data } }
}

