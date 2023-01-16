import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'

const fetcher = (url, token) =>
	axios
		.get(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: token,
			},
		})
		.then((res) => res.data)

export function GetQuizData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/quiz/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
// export async function GetQuizDataWithId(token, id) {
//     return await axios.get(`${SERVER_LINK}/quiz/find/${id}`,{
//         headers:{
//             Accept:'application/json',
//             'Content-Type':'applications/json;charset=UTF-8',
//             Authorization:token,
//         },
//     })
// }
export async function GetQuizDataWithId(token, id) {
	return await axios.get(`${SERVER_LINK}/quiz/find/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'applications/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
export async function DeleteQuiz(id, token) {
	return await axios.delete(`${SERVER_LINK}/quiz/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}

export async function AddQuiz(data, token) {
	return await axios({
		url: `${SERVER_LINK}/quiz/create`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	})
}
export async function EditQuiz(data, id, token) {
	await axios.patch(`${SERVER_LINK}/quiz/${id}`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
