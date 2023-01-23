import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'

// import { customAxios } from './customAxios'

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
export async function DeleteOrganization(organizationId, token) {
	return axiosInstance
		.delete(`/organization/${organizationId}`)
		.then((response) => {
			// handle success
			console.log(response.data)
		})
		.catch((error) => {
			// handle error
			console.log(error)
		})
}
export async function AddOrganization(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/organization`, data)
}

export async function EditOrganization(data, organizationId, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.patch(
		`${SERVER_LINK}/organization/${organizationId}`,
		data
	)
}
