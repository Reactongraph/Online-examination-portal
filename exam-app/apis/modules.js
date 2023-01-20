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

export function GetModuleData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/module/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function GetModuleDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/module/${id}`, token],
		([url, token]) => fetcher(url, token)
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteModule(id, token) {
	return await axios.delete(`${SERVER_LINK}/module/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}

export async function AddModule(data, token) {
	return await axios({
		url: `${SERVER_LINK}/module`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	})
}

export async function EditModule(data, id, token) {
	await axios.patch(`${SERVER_LINK}/module/${id}`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
