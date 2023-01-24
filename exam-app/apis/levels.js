import useSWR from 'swr'
import ApiCaller from './ApiCaller'

const fetcher = async (url) => {
	try {
		const response = await ApiCaller.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export function GetLevelData() {
	const { data, mutate, error, isLoading } = useSWR([`/level/find`], ([url]) =>
		fetcher(url)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export function GetLevelDataWithId(id) {
	const { data, error, isLoading, mutate } = useSWR([`/level/${id}`], ([url]) =>
		fetcher(url)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteLevel(id) {
	return await ApiCaller.delete(`/level/${id}`)
}

export async function AddLevel(data) {
	return await ApiCaller.post(`/level`, data)
}

export async function EditLevel(data, id) {
	return await ApiCaller.patch(`/level/${id}`, data)
}
