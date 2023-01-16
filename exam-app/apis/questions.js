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

export function GetQuestionData(token) {
	const { data, error, isLoading } = useSWR(
		[`${SERVER_LINK}/questions/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
	}
}
// export function GetQuestionDataWithId(token, id) {
//     const { data, error, isLoading, mutate } = useSWR(
//         [`${SERVER_LINK}/questions/find/${id}`, token],
//         ([url, token]) => fetcher(url, token)
//     )
//     return {
//         data,
//         error,
//         isLoading,
//         // mutate,
//     }
// }
export async function GetQuestionDataWithId(token, id) {
	// const { data, error, isLoading, mutate } = useSWR(
	//     [`${SERVER_LINK}/questions/find/${id}`, token],
	//     ([url, token]) => fetcher(url, token)
	// )
	// return {
	//     data,
	//     error,
	//     isLoading,
	//     // mutate,
	// }
	return await axios.get(`${SERVER_LINK}/questions/find/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'applications/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
export async function DeleteQuestion(id, token) {
	return await axios.delete(`${SERVER_LINK}/questions/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}

export async function Addquestion(data, token) {
	return await axios({
		url: `${SERVER_LINK}/questions/create`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	})
}
export async function UploadCsvQuestion(data, token) {
	return await axios({
		url: `${SERVER_LINK}/questions/uploads`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	})
}
export async function EditQuestion(data, id, token) {
	await axios.patch(`${SERVER_LINK}/questions/${id}`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
