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

export function GetLevelData(token) {
	const { data, mutate, error, isLoading } = useSWR(
		[`${SERVER_LINK}/level/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export function GetLevelDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/level/${id}`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteLevel(id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.delete(`${SERVER_LINK}/level/${id}`)
}

export async function AddLevel(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/level`, data)
}

export async function EditLevel(data, id, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.patch(`${SERVER_LINK}/level/${id}`, data)
}
