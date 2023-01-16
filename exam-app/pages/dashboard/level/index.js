import * as React from 'react'

import Level from '../../../components/level/Level'
import Layout from '../../../components/layout/Layout'

import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'
import { useSelector } from 'react-redux'
import { GetLevelData, GetLevelDataWithId } from '../../../apis/levels'

export default function level() {
	const user = useSelector((state) => state?.user)
	const { data, mutate } =
		user?.role == 'SuperAdminUser'
			? GetLevelData(user.token)
			: GetLevelDataWithId(user.token, user.id)
	return (
		<>
			<Layout title='Level'>
				<Level
					level_data={data}
					mutate={mutate}
				/>
			</Layout>
		</>
	)
}

// import * as React from 'react'

// import Module from '../../../components/module/Module'
// import Layout from '../../../components/layout/Layout'
// import { GetModuleData, GetModuleDataWithId } from '../../../apis/modules'

// // You can't name a function as MODULE...
// export default function modules() {
// const { data, mutate } =
// 	user?.role == 'SuperAdminUser'
// ?GetModuleData(user.token)
// : GetModuleDataWithId(user.token,user.id)
// 	return (
// 		<>
// 			<Layout title='Module'>
// 				<Module module_data={data}
// 					mutate={mutate} />
// 			</Layout>
// 		</>
// 	)
// }

// function for ssr data

// export async function getServerSideProps(data) {
// 	// Fetch data from external API
// 	const res = await axios.get(`${SERVER_LINK}/level/find`, {
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json;charset=UTF-8',
// 			Authorization: data.req.cookies.access_token,
// 		},
// 	})

// 	let level_data = res.data

// 	// Pass data to the page via props
// 	return { props: { level_data } }
// }
