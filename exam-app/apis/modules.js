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

export function GetModuleData() {
	const { data, error, isLoading, mutate } = useSWR([`/module/find`], ([url]) =>
		fetcher(url)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function GetModuleDataWithId(id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/module/${id}`],
		([url]) => fetcher(url)
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteModule(id) {
	return await ApiCaller.delete(`/module/${id}`)
}

export async function AddModule(data) {
	return await ApiCaller.post(`/module`, data)
}

export async function EditModule(data, id) {
	return await ApiCaller.patch(`/module/${id}`, data)
}
