import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'

const token = Cookies.get('refresh_token')
global.createAxiosInstance(token)
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

export function GetOrganizationData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/organization/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export function GetOrganizationDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/organization/${id}`, token],
		([url, token]) => fetcher(url, token)
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteOrganization(organizationId) {
	return await global.axiosInstance.delete(`/organization/${organizationId}`)
}
export async function AddOrganization(data) {
	return await global.axiosInstance.post(`/organization`, data)
}

export async function EditOrganization(data, organizationId) {
	return await global.axiosInstance.patch(
		`/organization/${organizationId}`,
		data
	)
}
