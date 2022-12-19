import * as React from 'react'

import Level from '../../../components/level/Level'
import Layout from '../../../components/layout/Layout'

import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'

export default function level({ level_data }) {
	return (
		<>
			<Layout title='Level'>
				<Level level_data={level_data} />
			</Layout>
		</>
	)
}

// function for ssr data

export async function getServerSideProps(data) {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/level/find`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization":data.req.cookies.jwt
    },
  });

	let level_data = res.data

	// Pass data to the page via props
	return { props: { level_data } }
}
