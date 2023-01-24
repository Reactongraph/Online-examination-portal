import useSWR from 'swr'
import customAxios from './ApiCaller'

const fetcher = async (url) => {
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export function GetAdminData() {
	const { data, mutate, error, isLoading } = useSWR([`/admin/`], ([url]) =>
		fetcher(url)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export function GetAdminDataWithId(id) {
	const { data, error, isLoading, mutate } = useSWR([`/admin/${id}`], ([url]) =>
		fetcher(url)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
