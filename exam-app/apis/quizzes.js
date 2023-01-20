import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import { customAxios } from './customAxios'

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
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.delete(`${SERVER_LINK}/quiz/${id}`)
}

export async function AddQuiz(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/quiz/create`, data)
}
export async function EditQuiz(data, id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.patch(`${SERVER_LINK}/quiz/${id}`, data)
}
