import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'
import customAxios from './customAxios'

const token = Cookies.get('refresh_token')
const fetcher = async (url, token) => {
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {

		return error.response.data
	}
}

export function GetOrganizationData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/organization/find`, token],
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
	return await customAxios.delete(`/organization/${organizationId}`)
}
export async function AddOrganization(data) {
	return await customAxios.post(`/organization`, data)
}

export async function EditOrganization(data, organizationId) {
	return await customAxios.patch(`/organization/${organizationId}`, data)
}
