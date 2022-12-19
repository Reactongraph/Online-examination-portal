import * as React from 'react'
import { SERVER_LINK } from '../../../helpers/config'
import axios from 'axios'
import Layout from '../../../components/layout/Layout'
import Participant from '../../../components/participant/Participant'

export default function participant({ participant_data }) {
	return (
		<>
			<Layout title='Participant'>
				<Participant participant_data={participant_data} />
			</Layout>
		</>
	)
}

// function for ssr data
export async function getStaticProps() {
	// Fetch data from external API
	const res = await axios.get(`${SERVER_LINK}/participants/find`)

	let participant_data = res.data

	// Pass data to the page via props
	return { props: { participant_data } }
}
