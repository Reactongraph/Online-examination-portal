import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'
import customAxios from './customAxios'

const token = Cookies.get('refresh_token')

const fetcher = async (url, token) =>
	{
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {

		return error.response.data
	}
}

export function GetLevelData(token) {
	const { data, mutate, error, isLoading } = useSWR(
		[`/level/find`, token],
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
		[`/level/${id}`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteLevel(id) {
	return await customAxios.delete(`/level/${id}`)
}

export async function AddLevel(data) {
	return await customAxios.post(`/level`, data)
}

export async function EditLevel(data, id, token) {
	return await customAxios.patch(`/level/${id}`,data)
}
