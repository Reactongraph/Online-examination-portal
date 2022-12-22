import * as React from 'react'

import Quizs from '../../../components/quiz/Quiz'
import Layout from '../../../components/layout/Layout'

import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'

// You can't name a function as MODULE...
export default function Quiz({ quiz_data, module_data, level_data }) {
	return (
		<>
			<Layout title='Quiz'>
				<Quizs
					quiz_data={quiz_data}
					level_data={level_data}
					module_data={module_data}
				/>
			</Layout>
		</>
	)
}

// function for ssr data

export async function getServerSideProps(data) {
	// Fetch data from external API
	const res = await axios.get(`${SERVER_LINK}/quiz/find`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: data.req.cookies.jwt,
		},
	})
	const levels = await axios.get(`${SERVER_LINK}/level/find`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: data.req.cookies.jwt,
		},
	})
	const modules = await axios.get(`${SERVER_LINK}/module/find`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: data.req.cookies.jwt,
		},
	})

	let quiz_data = res.data.quiz
	let level_data = levels.data
	let module_data = modules.data
	module_data = module_data.map((object) => {
		object.value = object.module
		object.label = object.module
		return object
	})

	// Pass data to the page via props
	return { props: { quiz_data, level_data, module_data } }
}
