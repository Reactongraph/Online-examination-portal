import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'

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
		([url, token]) => fetcher(url, token),
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function GetOrganizationDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/organization/${id}`, token],
		([url, token]) => fetcher(url, token),
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteOrganization(organizationId, token) {
	return await axios.delete(`${SERVER_LINK}/organization/${organizationId}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
export async function AddOrganization(data, token) {
	return await axios({
		url: `${SERVER_LINK}/organization`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	}).then((res) => res.data)
}

export async function EditOrganization(data, organizationId, token) {
	await axios.patch(`${SERVER_LINK}/organization/${organizationId}`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
