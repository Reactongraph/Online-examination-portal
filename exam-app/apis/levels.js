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

export function GetLevelData(token) {
	const { data, mutate, error, isLoading } = useSWR(
		[`${SERVER_LINK}/level/find`, token],
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
		[`${SERVER_LINK}/level/${id}`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteLevel(id, token) {
	return await axios.delete(`${SERVER_LINK}/level/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}

export async function AddLevel(data, token) {
	return await axios({
		url: `${SERVER_LINK}/level`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	})
}

export async function EditLevel(data, id, token) {
	await axios.patch(`${SERVER_LINK}/level/${id}`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
