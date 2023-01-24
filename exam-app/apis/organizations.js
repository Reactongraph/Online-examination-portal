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

export function GetOrganizationData() {
	const { data, error, isLoading, mutate } = useSWR(
		[`/organization/find`],
		([url]) => fetcher(url)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export function GetOrganizationDataWithId(id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/organization/${id}`],
		([url]) => fetcher(url)
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteOrganization(organizationId) {
	return await ApiCaller.delete(`/organization/${organizationId}`)
}
export async function AddOrganization(data) {
	return await ApiCaller.post(`/organization`, data)
}

export async function EditOrganization(data, organizationId) {
	return await ApiCaller.patch(`/organization/${organizationId}`, data)
}
