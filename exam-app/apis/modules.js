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

export function GetModuleData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/module/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function GetModuleDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/module/${id}`, token],
		([url, token]) => fetcher(url, token)
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteModule(id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.delete(`${SERVER_LINK}/module/${id}`)
}

export async function AddModule(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/module`, data)
}

export async function EditModule(data, id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.patch(`${SERVER_LINK}/module/${id}`, data)
}
