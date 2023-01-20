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

export function GetQuestionData(token) {
	const { data, mutate, error, isLoading } = useSWR(
		[`${SERVER_LINK}/questions/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export async function GetQuestionDataWithId(token, id) {
	return await axios.get(`${SERVER_LINK}/questions/find/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'applications/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
export async function DeleteQuestion(id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.delete(`${SERVER_LINK}/questions/${id}`)
}

export async function Addquestion(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/questions/create`, data)
}
export async function UploadCsvQuestion(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/questions/uploads`, data)
	
}
export async function EditQuestion(data, id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.patch(`${SERVER_LINK}/questions/${id}`, data)
}
